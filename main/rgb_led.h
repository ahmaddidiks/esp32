/*
 * rgb_led.h
 *
 *  Created on: Nov 9, 2022
 *      Author: didik
 */

#ifndef MAIN_RGB_LED_H_
#define MAIN_RGB_LED_H_

// RGB LED GPIO
#define RGB_LED_RED_GPIO				21
#define RGB_LED_GREEN_GPIO				22
#define RGB_LED_BLUE_GPIO				2

// RGB LED color mic channel
#define RGB_LED_CHANNEL_NUM				3

// RGB LED configuration
typedef struct
{
	int channel;
	int gpio;
	int mode;
	int timer_index;
}ledc_info_t;

ledc_info_t ledc_ch[RGB_LED_CHANNEL_NUM];

/*
 * Color to test pwm
 */
void rgb_led_test(uint8_t pwm);


/*
 * Color to indicate wifi application has started
 */
void rgb_led_wifi_app_started(void);

/*
 * Color to indicate HTTP server has started
 */
void rgb_led_http_server_started(void);

/*
 *
 * Color to indicate that esp32 is connected to an access point.
 */
void rgb_led_wifi_connected(void);

#endif /* MAIN_RGB_LED_H_ */
