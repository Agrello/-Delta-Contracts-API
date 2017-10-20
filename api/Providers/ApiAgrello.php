<?php
/**
 * Created by PhpStorm.
 * Date: 14.09.2017
 * Time: 13:54
 */

class ApiAgrello
{
    const API_URL = 'https://dev-api.agrello.org';

    /**
     * @var string
     */
    private $client_secret = '{Client Secret}';

    /**
     * @var integer
     */
    private $client_id = 12;

    public function __construct()
    {
        if (!isset($_SESSION['access_token']) || !$_SESSION['access_token']) {
            $this->setAccessToken();
        }
    }

    /**
     * @return string
     */
    public function getAccessToken()
    {
        return $_SESSION['access_token'];
    }

    /**
     * @return void
     */
    private function setAccessToken()
    {
        $server_output = $this->curl(self::API_URL . '/oauth/token',
            [
                'grant_type' => 'client_credentials',
                'scope' => '*',
                'client_secret' => $this->client_secret,
                'client_id' => $this->client_id,
            ],
            'POST');
        $response = json_decode($server_output);
        $_SESSION['access_token'] = $response->access_token ?? '';
    }

    /**
     * @param string $url
     * @param array $data
     * @param string $method 'POST' or 'GET'
     * @return string;
     */
    private function curl($url, $data = [], $method = 'GET')
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        //TODO SSL verify should be TRUE
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
        if ($method === 'POST') {
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
        }
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        $server_output = curl_exec($ch);

        $httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        header('Request error', true, $httpcode);

        curl_close($ch);
        return $server_output;
    }

    /**
     * @param string $url
     * @param array $data
     * @param string $method 'POST' or 'GET'
     * @return string
     */
    public function requestApi($url, $data = [], $method = 'GET')
    {
        $requestUrl = self::API_URL . '/v1' . $url . '?access_token=' . $this->getAccessToken();
        return $this->curl($requestUrl, $data, $method);
    }
}
