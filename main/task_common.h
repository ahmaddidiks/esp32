/*
 * task_common.h
 *
 *  Created on: Nov 10, 2022
 *      Author: didik
 */

#ifndef MAIN_TASK_COMMON_H_
#define MAIN_TASK_COMMON_H_

// WIFI application task
#define WIFI_APP_TASK_STACK_SIZE				4096
#define WIFI_APP_TASK_PRIORITY					5
#define WIFI_APP_TASK_CORE_ID					0

// HTTP Server task
#define HTTP_SERVER_TASK_STACK_SIZE				8192
#define HTTP_SERVER_TASK_PRIORITY				4
#define HTTP_SERVER_TASK_ID_CORE				0

// HTTP Server Monitor task
#define HTTP_SERVER_MONITOR_TASK_STACK_SIZE		4096
#define HTTP_SERVER_MONITOR_TASK_PRIORITY		3
#define HTTP_SERVER_MONITOR_TASK_ID_CORE		0

#endif /* MAIN_TASK_COMMON_H_ */
