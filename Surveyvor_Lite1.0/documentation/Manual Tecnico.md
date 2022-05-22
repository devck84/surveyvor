<!-----
NEW: Check the "Suppress top comment" option to remove this info from the output.

Conversion time: 1.903 seconds.


Using this Markdown file:

1. Paste this output into your source file.
2. See the notes and action items below regarding this conversion run.
3. Check the rendered output (headings, lists, code blocks, tables) for proper
   formatting and use a linkchecker before you publish this page.

Conversion notes:

* HTML and Markdown from Docs version 1.0
* Sun May 22 2022 09:16:45 GMT-0000 (UTC)
* Source doc: Manual Técnico - Surveyvor_Lite Móvil App
* This is a partial selection. Check to make sure intra-doc links work.
* This document has images: check for >>>>>  gd2md-html alert:  inline image link in generated source and store images to your server. NOTE: Images in exported zip file from Google Docs may not appear in  the same order as they do in your doc. Please check the images!


WARNING:
You have 5 H1 headings. You may want to use the "H1 -> H2" option to demote all headings by one level.

----->


<p style="color: red; font-weight: bold">>>>>>  gd2md-html alert:  ERRORs: 0; WARNINGs: 1; ALERTS: 5.</p>
<ul style="color: red; font-weight: bold"><li>See top comment block for details on ERRORs and WARNINGs. <li>In the converted Markdown or HTML, search for inline alerts that start with >>>>>  gd2md-html alert:  for specific instances that need correction.</ul>

<p style="color: red; font-weight: bold">Links to alert messages:</p><a href="#gdcalert1">alert1</a>
<a href="#gdcalert2">alert2</a>
<a href="#gdcalert3">alert3</a>
<a href="#gdcalert4">alert4</a>
<a href="#gdcalert5">alert5</a>

<p style="color: red; font-weight: bold">>>>>> PLEASE check and correct alert issues and delete this message and the inline alerts.<hr></p>


23/05/2022

Manual Técnico

Surveyvor_Lite Móvil App



<p id="gdcalert1" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image1.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert2">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image1.png "image_tooltip")


**Autor**: Dereck Cepeda

Desarrollo de Aplicaciones Multiplataforma (**DAM**)

**Contenido**


# **Introducción**

	El siguiente manual guiará a los usuarios a mantener el sistema actualizado y dar soporte en caso de ser requerido, informarles sobre los requisitos y la estructura del sistema, en la creación de aplicativos móviles conectados a través de la base de datos en la nube, el cual muestra las herramientas necesarias para la construcción y la funcionalidad del sistema.

**Surveyvor_Lite Móvil App** está diseñado para adquirir la posibilidad de ver y hacer ligeros cambios según la información registrada en la plataforma.

**Surveyvor_Lite Móvil App** está desarrollado en Flutter - Dart para Sistemas operativos móviles: Android Jelly Bean, v16, 4.1.x o posterior, y iOS 8 o más nuevo, tiene conexión a una base de datos en MSSQL y trabaja con un servidor Microsoft Server 2016 Standard.


# **Requerimientos Técnicos**



* **Requerimientos Técnicos de Hardware**
1. dispositivos iOS (iPhone 4S o posterior) y dispositivos Android ARM.
2. Memoria RAM: 2gb o superior
* **Requerimientos Técnicos de Software**
1. Sistema operativo : Android Jelly Bean, v16, 4.1.x o posterior, y iOS 8 o más nuevo.


# **Herramientas utilizadas para el desarrollo**

**Flutter**

Flutter es un marco de código abierto de Google para crear hermosas aplicaciones multiplataforma compiladas de forma nativa a partir de una única base de código.

**Dart**

Dart es un lenguaje de programación diseñado para el desarrollo de clientes, como aplicaciones web y móviles. Está desarrollado por Google y también se puede utilizar para crear aplicaciones de servidor y de escritorio. Es un lenguaje orientado a objetos.

**Intellij IDEA**

**	**IntelliJ IDEA es un entorno de desarrollo integrado (IDE) multiplataforma para Java. El IDE puede extenderse mediante numerosos complementos que harán de él un programa todavía más completo.


## **Postman**

Es una aplicación que nos permite realizar pruebas API. Es un cliente HTTP que nos da la posibilidad de testear ‘HTTP requests’ a través de una interfaz gráfica de usuario, por medio de la cual obtendremos diferentes tipos de respuesta que posteriormente deberán ser validados.


## **Git**

	Es un _software_ de control de versiones diseñado por Linus Torvalds, pensando en la eficiencia, la confiabilidad y compatibilidad del mantenimiento de versiones de aplicaciones cuando estas tienen un gran número de archivos de código fuente. Su propósito es llevar registro de los cambios en archivos de computadora incluyendo coordinar el trabajo que varias personas realizan sobre archivos compartidos en un repositorio de código. 

**Instalación**

Para la instalación del aplicativo móvil es necesario seguir los siguientes pasos, en primer lugar, descargar el archivo “**Surveyvor_lite.apk**” que contiene el ejecutable de la aplicación.

En el dispositivo móvil, entrar en ajustes, seguridad y seleccionar la opción “Fuentes Desconocidas” lo cual le permitirá al dispositivo reconocer el archivo **.apk** y permitir su instalación. Una vez realizado, seleccionar el archivo y se instalará en el dispositivo.

**NOTA**: El archivo debe estar dentro del teléfono para poder instalarse


# **Ingreso a la aplicación**

	Para ingresar a la aplicación solo se necesita posicionarse en la pantalla inicial de la aplicación, donde podrás entrar con tus credenciales:



<p id="gdcalert2" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image2.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert3">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image2.png "image_tooltip")


	En caso de no tener credenciales, la pantalla de registro está especificada en la pantalla inicial (Como podemos ver en la figura anterior)



<p id="gdcalert3" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image3.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert4">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image3.png "image_tooltip")


Con esta pantalla podrás registrarte tras rellenar los campos obligatorios, y asimismo, ingresar a la aplicación.


# **Actividad Principal**

La función principal de **Surveyvor_Lite Móvil App **es la de ver la información registrada y edición de encuestas:

La creación de encuestas se realizaría en la siguiente pantalla:



<p id="gdcalert4" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image4.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert5">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image4.png "image_tooltip")


<p id="gdcalert5" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image5.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert6">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image5.png "image_tooltip")


Pudiendo especificar en la primera pestaña el nombre, descripción, privacidad, el estado de actividad de la encuesta, color de fondo de la encuesta y finalmente también el color de los botones.
