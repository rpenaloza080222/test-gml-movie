Aplicación de Angular 19 con TMDb API
Esta es una aplicación desarrollada con Angular 19 que consume la API de The Movie Database (TMDb) para mostrar información sobre películas, series y actores populares. La aplicación incluye funcionalidades como búsqueda, visualización de detalles y exploración de contenido multimedia.

Características
Listado de películas populares.
Búsqueda de películas y series.
Visualización de detalles como sinopsis, puntuación y reparto.
Diseño responsivo y moderno.
Requisitos previos
Antes de comenzar, asegúrate de tener instalados los siguientes componentes en tu sistema:

Node.js (versión 16 o superior)
npm (instalado junto con Node.js)
Angular CLI (versión 15 o superior):
Puedes instalar Angular CLI ejecutando:
bash
Copy code
npm install -g @angular/cli
Instalación
Sigue estos pasos para instalar y configurar la aplicación:

Clona este repositorio en tu máquina local:

bash
Copy code
git clone <URL_DEL_REPOSITORIO>
cd <NOMBRE_DEL_REPOSITORIO>
Instala las dependencias del proyecto:

bash
Copy code
npm install
Obtén una clave de API de TMDb:
Ve a TMDb API y regístrate/inicia sesión para obtener una clave de API.

Configura las credenciales:
Crea un archivo de entorno local (src/environments/environment.ts) y agrega tu clave de API de TMDb:

typescript
Copy code
export const environment = {
  production: false,
  apiKey: 'TU_CLAVE_DE_API',
  apiUrl: 'https://api.themoviedb.org/3'
};
Para producción, también puedes configurar src/environments/environment.prod.ts de manera similar.

Uso
Para correr la aplicación en modo de desarrollo:

bash
Copy code
ng serve
Esto iniciará un servidor de desarrollo en http://localhost:4200/. La aplicación se recargará automáticamente al realizar cambios en el código.

Construcción para producción
Para construir una versión optimizada de la aplicación:

bash
Copy code
ng build --prod
Los archivos resultantes estarán disponibles en el directorio dist/. Puedes utilizar cualquier servidor estático para desplegar la aplicación.

API de TMDb
Esta aplicación utiliza la API de TMDb para obtener información sobre películas, series y actores. Para más detalles sobre los endpoints y parámetros, consulta la documentación oficial de TMDb.

Contribuciones
Las contribuciones son bienvenidas. Si deseas agregar nuevas funcionalidades o corregir errores, sigue estos pasos:

Haz un fork del repositorio.
Crea una rama para tu funcionalidad/solución:
bash
Copy code
git checkout -b mi-nueva-funcionalidad
Realiza tus cambios y haz commits descriptivos.
Envía un Pull Request.
Licencia
Este proyecto está bajo la licencia MIT. Consulta el archivo LICENSE para más detalles.

