export enum Eventos {

    ADMIN="Admin", //Envia Info al Admin
    CUSTOMER = "Customer", // Envia info al customer
    DELIVERY = "Delivery", // Envia info al Delivery
    UBICACION = "Ubicacion", // Envia coordenadas
    DESCONECTAR ="disconnect", //GLOBAL
    CONECTAR = "connect", // GLOBAL
    CONFIGUSER ="salaRestaurant", //Configura al usuario en su sala (debe ir siempre en el evento connect) (debes mandar id del usuario dentro del payload)



}

export enum Salas {

    ADMIN="salaRestaurant-Colaborador",
    DELIVERY ="salaRestaurant-Delivery",
    CUSTOMER = "salaRestaurant-Customer"


}

export enum Roles{
  ADMIN="ADMIN",
  GERENTE="GERENTE",
  COLABORADOR="COLABORADOR",
  DELIVERY ="DELIVERY",
  CUSTOMER = "CUSTOMER"
}


export enum Status{
  TOCONFIRM="TO CONFIRM",
  ACCEPTED = "ACCEPTED",
  CANCELLED = "CANCELLED",
  ONWALK="ON WALK",
  FINISHED="FINISHED",
  READY ="READY",
  PREPARING="PREPARING"
}


export enum Tags{
NEW="NEW",
RECOMMENDED="RECOMMENDED",
PROMOTION="PROMOTION",
POPULAR="POPULAR",
VEGAN="VEGAN"
}
