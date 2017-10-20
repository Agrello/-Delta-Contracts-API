<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');
session_start();
require_once 'Providers/ApiAgrello.php';

$ag = new ApiAgrello();

if (isset($_POST['url'])) {
    $url = filter_var($_POST['url'], FILTER_SANITIZE_URL);
    $data = is_array($_POST['data']) ? $_POST['data'] : [];
    $method = (isset($_POST['method']) && in_array($_POST['method'], ['POST', 'GET', 'PUT', 'DELETE'])) ? $_POST['method'] : 'GET';
    echo $ag->requestApi($url, $data, $method);
} else {
    header('400 Bad Request', true, 400);
    echo json_encode(['success' => false, 'message' => 'Error POST request.']);
}
