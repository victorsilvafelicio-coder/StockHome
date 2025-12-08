# Conexão ao Banco de Dados MySQL

Este arquivo contém todas as informações necessárias para configurar a
conexão ao banco de dados **db_user_4**.

------------------------------------------------------------------------

## Informações do Servidor de Banco de Dados

-   **Servidor:** `mysql.marize-us.svc.cluster.local` (via TCP/IP)\
-   **Tipo:** MySQL\
-   **SSL:** Não utilizado\
-   **Versão:** 8.0.43 (MySQL Community Server - GPL)\
-   **Protocolo:** 10\
-   **Usuário:** `user_4@10.1.165.203`\
-   **Charset:** UTF-8 Unicode (`utf8mb4`)\
-   **Banco:** `db_user_4`

------------------------------------------------------------------------

## Informações do Servidor Web

-   **Servidor Web:** Apache/2.4.65 (Debian)\
-   **Versão PHP:** 8.3.27\
-   **Extensões PHP Disponíveis:**
    -   mysqli\
    -   curl\
    -   mbstring\
    -   sodium\
-   **Cliente MySQL:** `libmysql - mysqlnd 8.3.27`

------------------------------------------------------------------------

## Exemplo de Conexão (PHP)

``` php
<?php
$host = "mysql.marize-us.svc.cluster.local";
$user = "user_4";
$pass = "Twq7e9YE-4!";
$db   = "db_user_4";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}

echo "Conexão bem-sucedida!";
?>
```

------------------------------------------------------------------------

## Exemplo de Conexão (Python - mysql.connector)

``` python
import mysql.connector

conn = mysql.connector.connect(
    host="mysql.marize-us.svc.cluster.local",
    user="user_4",
    password="Twq7e9YE-4!",
    database="db_user_4"
)

print("Conectado com sucesso!")
```

------------------------------------------------------------------------
