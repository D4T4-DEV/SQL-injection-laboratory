# LABORATORIO DE INYECCION SQL EN UNA API
Se utilizo node.js con express para crear una api rapida, en donde
se plantea usar las inyecciones sql comunes para vulnerar un "login" en base a un endpoint simulado

### La inyección usada fue 
`' OR '1'='1' -- `, aunado a que para ser descriptivo la api devolvera:
```
{
  msg: "" // Mensaje de status
  data: "" // Datos que devolvió
  consulta: "" // Valores adjuntados a la consulta y su ejecución
}
```
### Para hacer las solicitudes "POSTMAN"
Se uso postman para hacer las pruebas teniendo lo siguiente:

- Para la pruebas del endpoint vulnerable se usa: `http://localhost:3002/login-inj-sql` 
- Para las pruebas del endpint no vulverable con la inyección se usa: `http://localhost:3002/login-no-inj-sql`
- La manera de mandar los datos se usa el metodo `POST` con el `body` en `RAW` con el siguiente formato:
   ```
  {
    "username": "usuario1", // Usuario para la consulta
    "password": "password123" // Contraseña guardada
  }
  ```
