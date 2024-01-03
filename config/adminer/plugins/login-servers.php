<?php
require_once('plugins/login-servers.php');

return new AdminerLoginServers(
	$servers = array(
		'User Local' => array('server' => 'pg_user', 'driver' => 'pgsql'),
		'Map Local' => array('server' => 'pg_map', 'driver' => 'pgsql'),
		'Company Local' => array('server' => 'pg_com', 'driver' => 'pgsql'),
		'Unit Local' => array('server' => 'pg_unit', 'driver' => 'pgsql'),
		'Log Local' => array('server' => 'pg_log', 'driver' => 'pgsql'),
	)
);