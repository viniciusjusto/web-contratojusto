// PagarMe API Client
const PAGARME_API_KEY = import.meta.env.VITE_PAGARME_API_KEY;
const PAGARME_PUBLIC_KEY = import.meta.env.VITE_PAGARME_PUBLIC_KEY;
const PAGARME_BASE_URL = 'https://api.pagar.me/core/v5';

export interface CreateOrderData {
  amount: number; // amount in cents
  customer: {
    name: string;
    email: string;
    document: string;
    document_type: 'CPF' | 'CNPJ';
    type: 'individual' | 'company';
    phones: {
      mobile_phone: {
        country_code: string;
        area_code: string;
        number: string;
      };
    };
  };
  items: Array<{
    amount: number;
    description: string;
    quantity: number;
  }>;
  payments: Array<{
    payment_method: 'credit_card' | 'pix';
    credit_card?: {
      card: {
        number: string;
        holder_name: string;
        exp_month: number;
        exp_year: number;
        cvv: string;
      };
      installments: number;
    };
    pix?: {
      expires_in: number;
    };
  }>;
}

export interface OrderResponse {
  id: string;
  status: string;
  amount: number;
  charges: Array<{
    id: string;
    amount: number;
    status: string;
    payment_method: string;
    last_transaction: {
      qr_code?: string;
      qr_code_url?: string;
      success: boolean;
    };
  }>;
}

class PagarMeClient {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = PAGARME_API_KEY;
    this.baseUrl = PAGARME_BASE_URL;
  }

  private getAuthHeader(): string {
    return `Basic ${btoa(this.apiKey + ':')}`;
  }

  async createOrder(data: CreateOrderData): Promise<OrderResponse> {
    const response = await fetch(`${this.baseUrl}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.getAuthHeader(),
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erro ao processar pagamento');
    }

    return response.json();
  }

  async getOrder(orderId: string): Promise<OrderResponse> {
    const response = await fetch(`${this.baseUrl}/orders/${orderId}`, {
      method: 'GET',
      headers: {
        'Authorization': this.getAuthHeader(),
      },
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar pedido');
    }

    return response.json();
  }

  getPublicKey(): string {
    return PAGARME_PUBLIC_KEY;
  }
}

export const pagarme = new PagarMeClient();
