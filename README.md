# Trabajo Práctico Final – Estadística II (2025)

Sistema web para el análisis estadístico de ventas, desarrollado con **Node.js**, **Express**, **MySQL**, **Chart.js** y un frontend simple en **HTML + JS**.

Este informe resume la **base de datos**, el **backend**, el **frontend**, los **cálculos estadísticos**, los **gráficos generados** y una descripción del trabajo realizado.

---

## 1. Estructura de la Base de Datos

El sistema utiliza tres tablas principales, conectadas mediante claves foráneas:

### **Tabla: `clientes`**

| Campo                 | Tipo         | Descripción               |
| --------------------- | ------------ | ------------------------- |
| id                    | INT          | Identificador único       |
| nombre                | VARCHAR(50)  | Nombre del cliente        |
| apellido              | VARCHAR(50)  | Apellido                  |
| email                 | VARCHAR(100) | Correo electrónico        |
| ciudad                | VARCHAR(50)  | Ciudad                    |
| edad                  | INT          | Edad del cliente          |
| createdAt / updatedAt | TIMESTAMP    | Gestionados por Sequelize |

---

### **Tabla: `productos`**

| Campo                 | Tipo         | Descripción         |
| --------------------- | ------------ | ------------------- |
| id                    | INT          | Identificador único |
| nombre                | VARCHAR(100) | Nombre del producto |
| categoria             | VARCHAR(50)  | Categoría           |
| precio_unitario       | DECIMAL      | Precio por unidad   |
| stock                 | INT          | Cantidad disponible |
| createdAt / updatedAt | TIMESTAMP    | Automáticos         |

---

### **Tabla: `venta`**

| Campo       | Tipo    | Descripción                                  |
| ----------- | ------- | -------------------------------------------- |
| id          | INT     | ID de venta                                  |
| fecha       | DATE    | Fecha de la venta                            |
| cantidad    | INT     | Unidades vendidas                            |
| metodo_pago | VARCHAR | Método de pago utilizado                     |
| total       | DECIMAL | Total calculado (cantidad × precio_unitario) |
| clienteId   | INT     | FK hacia `clientes`                          |
| productoId  | INT     | FK hacia `productos`                         |

---

## 2. Principales Consultas SQL

### Insertar cliente:

```sql
INSERT INTO clientes (nombre, apellido, email, ciudad, edad)
VALUES ('Juan', 'Pérez', 'juan@gmail.com', 'Buenos Aires', 32);
```

### Insertar producto:

```sql
INSERT INTO productos (nombre, categoria, precio_unitario, stock)
VALUES ('Laptop Lenovo 14"', 'Tecnología', 450000, 12);
```

### Insertar venta:

```sql
INSERT INTO venta (fecha, cantidad, metodo_pago, total, clienteId, productoId)
VALUES ('2025-02-10', 2, 'Tarjeta', 900000, 1, 1);
```

### Obtener todas las ventas:

```sql
SELECT * FROM venta;
```

---

## 3. Variables Analizadas

Estas son las variables consideradas en el análisis estadístico:

### **Total vendido por día**

Valores de ventas agrupados por fecha.

### **Precio unitario**

Costo individual de cada producto.

### **Cantidad vendida**

Unidades vendidas por operación.

### **Total de cada venta**

Se calcula como:

```
total = precio_unitario × cantidad
```

---

## 4. Cálculos Estadísticos Realizados

El backend implementa las siguientes métricas:

### **✔ Media (Promedio)**

Promedio del total vendido por día:

```
promedio = suma(totales_del_dia) / cantidad_de_ventas
```

### **✔ Desvío estándar**

Mide qué tan dispersos están los valores respecto al promedio:

```
desvío = sqrt( Σ (x - media)² / n )
```

### **✔ Correlación Precio ↔ Cantidad**

Analiza si productos más caros se venden más o menos:

```
coef = Σ((x - mediaX)(y - mediaY)) / sqrt( Σ(x - mediaX)² * Σ(y - mediaY)² )
```

---

## 5. Gráficos e Interpretación

El dashboard genera tres visualizaciones:

### **1. Promedio de ventas por día (gráfico de barras + línea de promedio general)**

Permite visualizar:

-   Variación diaria
-   Comparación con el promedio general
-   Tendencias

### **2. Desvío Estándar**

Muestra la variación del total vendido:

-   Un desvío alto → ventas muy variables
-   Un desvío bajo → ventas estables

### **3. Correlación Precio ↔ Cantidad**

Indica si hay relación entre:

-   Precio de los productos
-   Cantidad vendida

Valores cercanos a:

-   **1** → correlación positiva fuerte
-   **0** → no hay correlación
-   **-1** → inversa fuerte

---

## 6. Descripción de Tareas Realizadas

### **Desarrollo Backend**

-   Configuración de Express y CORS
-   Modelado ORM con Sequelize
-   Creación de rutas CRUD: clientes, productos, ventas
-   Endpoints estadísticos
-   Cálculo matemático backend
-   Manejo de errores y validaciones

### **Desarrollo Frontend**

-   Formularios para cargar clientes, productos y ventas
-   Integración con la API mediante Fetch
-   Actualización automática del dashboard
-   Implementación de gráficos con Chart.js
-   Línea de promedio general interactiva
-   Formateo numérico (punto para miles, coma para decimales)

### **Base de datos**

-   Modelado de tablas
-   Relaciones entre entidades
-   Inserción de datos de prueba
-   Limpieza y reimportación de datos

### **Tiempo de dedicación**

| Integrante         | Tareas                                 | Tiempo estimado   |
| ------------------ | -------------------------------------- | ----------------- |
| Rafael Vales       | Backend + Frontend + DB + Estadísticas | 34% del proyecto  |
| ------------------ | -------------------------------------- | ----------------- |
| Matias Mestre      | Backend + Frontend + DB + Estadísticas | 33% del proyecto  |
| ------------------ | -------------------------------------- | ----------------- |
| Mariano Scarcella  | Backend + Frontend + DB + Estadísticas | 33% del proyecto  |

---

## 🚀 7. Cómo Ejecutar el Proyecto

### 1. Instalar dependencias:

```bash
npm install
```

### 2. Configurar base de datos en `/src/config/db.js`

### 3. Iniciar servidor backend:

```bash
node src/index.js
```

### 4. Abrir el frontend:

Simplemente abrir:

```
src/frontend/index.html
```

---

## ✔ Estado Final

El sistema:

-   Permite **crear clientes, productos y ventas**
-   Calcula automáticamente totales
-   Muestra estadísticas actualizadas en tiempo real
-   Genera gráficos profesionales e interpretables

---

## Autores

**Rafael Vales – Matias Mestre – Mariano Scarcella – IDRA 2025**
