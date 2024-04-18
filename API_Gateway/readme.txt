Acá se dan ejemplos de todas las consultas graphql:

/// Microservicio usuarios

mutation {
  registerUser(email: "saruizh@unal.edu.co", username: "saruizh", password: "123456789") {
    response
  }
}



//Microservicio vaca

mutation {
  createVaca(idPlan: 56, nombreVaca: "Vamos a brasil", fechaLimite: "2024-04-30T12:00:00", montoTotal: 100000.0, Alcance:10) {
    response
  }
}



mutation {
  updateVaca(idVaca: 1, montototal: 10000.0) {
    response
  }
}









//Microservicio planes
mutation{
  createPlan(name:"Estereo Picnic", date: "2024-04-30", chatLink:"https://wa.me/98765432", userAdmin:1, place:1){
    response
  }
}

mutation{
  createCiudad(name: "Yopal"){
    response
  }
}





