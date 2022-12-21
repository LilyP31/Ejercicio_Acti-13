//La empresa “MULTIPLAN” dedicada al alquiler de vehículos, emite una factura de acuerdo al servicio prestado a sus clientes por la distancia recorrida en el auto alquilado. Si la distancia recorrida no es mayor a los 300 km., se cobra una tarifa fija de S/.250, si la distancia recorrida es mayor a 300 km. y hasta 1000 km. se cobra la tarifa fija más el exceso de kilómetros a razón de S/. 30 por km. y si la distancia recorrida es mayor a 1000 km., la compañía cobra la tarifa fija más los kilómetros recorridos entre 300 hasta 1000 a razón de S/. 30, más S/.20 por Kilómetro de exceso en distancias mayores de 1000 km. 
//Además, por promoción otorga un descuento del 10% del importe a pagar, por importes mayores a 500 soles.

// Se crea un modulo Angular // 

let app = angular.module('facturaApp', [])

// Se crea un controlador llamado "facturaCtrl" para el módulo "facturaApp"
app.controller('facturaCtrl', function($scope) {
  // Tarifas fijas y por exceso de distancia recorrida
  $scope.tarifaFija = 250;
  $scope.tarifaExceso = 30;
  $scope.tarifaExceso1000 = 20;

  // Límites para aplicar tarifas por exceso de distancia recorrida
  $scope.limiteExceso = 300;
  $scope.limiteExceso1000 = 1000;

  // Límite para aplicar descuento
  $scope.limiteDescuento = 500;
  // Porcentaje de descuento
  $scope.porcentajeDescuento = 0.1;

  // Función que calcula el importe a pagar según la distancia recorrida
  $scope.importeAPagar = function() {
    // Si no se ha ingresado una distancia recorrida, se asume 0
    let distanciaRecorrida = $scope.distanciaRecorrida || 0;
    // Si la distancia recorrida es menor o igual al límite para aplicar la tarifa fija, se devuelve la tarifa fija
    if (distanciaRecorrida <= $scope.limiteExceso) {
      return $scope.tarifaFija;
    }
    // Si la distancia recorrida es mayor al límite para aplicar la tarifa fija pero menor o igual al límite para aplicar la tarifa por exceso de 1000 km, se devuelve la tarifa fija más la tarifa por exceso de distancia recorrida
    else if (distanciaRecorrida <= $scope.limiteExceso1000) {
      return $scope.tarifaFija + ($scope.tarifaExceso * (distanciaRecorrida - $scope.limiteExceso));
    }
    // Si la distancia recorrida es mayor al límite para aplicar la tarifa por exceso de 1000 km, se devuelve la tarifa fija más la tarifa por exceso de distancia recorrida hasta 1000 km más la tarifa por exceso de distancia recorrida mayor a 1000 km
    else {
      return $scope.tarifaFija + ($scope.tarifaExceso * ($scope.limiteExceso1000 - $scope.limiteExceso)) + ($scope.tarifaExceso1000 * (distanciaRecorrida - $scope.limiteExceso1000));
    }
  };

  // Función que calcula el descuento aplicable
  $scope.descuento = function() {
    // Se obtiene el importe a pagar
    var importeAPagar = $scope.importeAPagar();
   // Si el importe a pagar es mayor al límite para aplicar descuento, se devuelve el importe a pagar multiplicado por el porcentaje de descuento
    if (importeAPagar > $scope.limiteDescuento) {
    return importeAPagar * $scope.porcentajeDescuento;
    }
    // Si el importe a pagar no supera el límite para aplicar descuento, no se aplica descuento y se devuelve 0
    else {
    return 0;
    }
    };

    // Función que calcula el total a pagar, que es el importe a pagar menos el descuento aplicable
    $scope.totalAPagar = function() {
    return $scope.importeAPagar() - $scope.descuento();
    };
    });        
    
