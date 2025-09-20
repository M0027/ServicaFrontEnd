export interface Proposta {
  id: string;
  client_phone: string;
  professional_id: string;
  order_id: string;
  message: string;
  price: number;
  created_at: string;
  status: 'aceite' | 'regeitado' | 'pendente';
  client_id: string; // Add client_id for linking to client profile
  professional_name: string; 
  client_name: string; // Add client_name to display the client's name
  // Remove old fields that are not in the new structure
  // title: string;
  // description: string;
  // event_date: string;
  // location: string;
  // service_id: string;
  // client: {
  //   id: string;
  //   name: string;
  //   email: string;
  // };
  // service: {
  //   id: string;
  //   name: string;
  // };
}

export interface Order {
  id: string;
  client_id: string;
  title: string;
  description: string;
  event_date: string;
  location: string;
  service_id: string;
  created_at: string;
}

export interface ProfessionalProfile {
  id: string;
  user_id: string;
  service_id: string;
  description: string;
  address: string;
  image_url: string;
  created_at: string;
  name?:string;
  service_name?:string;
  phone?: string;
  whatsapp: string;
  // status: 'pendente' | 'aprovado' | 'regeitado';
  status: any;
  certificacoes : string;
  clientes_atendidos: string;
  deslocamento : string;
  formas_pagamento: string;
  experiencia: string;


  user?: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  service?: {
    id: string;
    name: string;
  };
}

export interface Comment {
  id: string;
  user_id: string;
  professional_id: string;
  comment: string;
  created_at: string;
  name: string; // Assuming we'll get the user's name along with the comment
}

export interface UserData {
  token: string;
  id: string;
  role: string;
  service_id: string;
  name: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    service_id?: string; // Add service_id for professional users
    // Add other user properties as needed, e.g., phone, profile_picture
  };
}
