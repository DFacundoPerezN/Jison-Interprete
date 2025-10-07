class Declaracion {
  constructor(id, tipoDato, valor) {
    this.id = id;
    this.tipoDato = tipoDato;
    this.valor = valor;
  }

  interpretar(entorno) {
    const val = this.valor.interpretar(entorno);
    entorno.declarar(this.id, this.tipoDato, val);
  }
}

class Asignacion {
  constructor(id, valor) {
    this.id = id;
    this.valor = valor;
  }

  interpretar(entorno) {
    const val = this.valor.interpretar(entorno);
    entorno.asignar(this.id, val);
  }
}

class Incremento {
  constructor(id) {
    this.id = id;
  }

  interpretar(entorno) {
    const val = entorno.obtener(this.id);
    entorno.asignar(this.id, val + 1);
  }
}

class Imprimir {
  constructor(valor) {
    this.valor = valor;
  }

  interpretar(entorno) {
    const val = this.valor.interpretar(entorno);
    entorno.salida += (val !== undefined && val !== null ? val : "null") + "\n";
  }
}

class Si {
  constructor(condicion, sentencias) {
    this.condicion = condicion;
    this.sentencias = sentencias;
  }

  interpretar(entorno) {
    //console.log("Condición SI:",  this.condicion);
    const cond = this.condicion.interpretar(entorno);
    if (cond) {
      for (const instr of this.sentencias) {
        instr.interpretar(entorno);
      }
    } 
    // else if (this.else_if) {

    // } else if (this.else) {
    //   for (const instr of this.else) {
    //     instr.interpretar(entorno);
    //   }
    // }
  }
}

class Para {
  constructor(inicio, condicion, actualizacion, sentencias) {
    this.inicio = inicio;
    this.condicion = condicion;
    this.actualizacion = actualizacion;
    this.sentencias = sentencias;
  }

  interpretar(entorno) {
    this.inicio.interpretar(entorno);
    //console.log("Condición PARA:",  this.condicion);
    var condicionVal = this.condicion.interpretar(entorno);
    //console.log("Valor condición PARA:",  condicionVal);
    while (condicionVal) {
      for (const instr of this.sentencias) {
        instr.interpretar(entorno);
      }
      this.actualizacion.interpretar(entorno);
      condicionVal = this.condicion.interpretar(entorno);
      console.log("Valor condición PARA:",  condicionVal);
    } 
  }
}

module.exports = {
  Declaracion,
  Asignacion,
  Incremento,
  Imprimir,
  Si,
  Para
};
