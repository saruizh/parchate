Acá se dan ejemplos de todas las consultas graphql:

/// Microservicio usuarios

mutation {
  registerUser(email: "saruizh@unal.edu.co", username: "saruizh", password: "123456789") {
    response
  }
}

mutation {
  loginUser(email: "saruizh@unal.edu.co", password: "123456789") {
    response
  }
}



//Microservicio vaca

mutation {
  createVaca(idPlan: 56, nombreVaca: "Vamos a brasil", fechaLimite: "2024-04-30T12:00:00Z", montoTotal: 100000.0, Alcance: "10") {
    response
  }
}





