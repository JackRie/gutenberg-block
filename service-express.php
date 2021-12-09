<?php
/**
 * Plugin Name: Service Express
 * Plugin URI: https://example.com
 * Description: A plugin to create a sample Gutenberg Block for Service Express
 * Version: 1.0.0
 * Author: Jackie Riemersma
 * Text Domain: servex
 * Domain Path: /languages
 */

if( ! defined('ABSPATH') ) exit; //Exit if accessed directly

//  Define plugin constants
define('SERVEX_PATH', trailingslashit( plugin_dir_path(__FILE__) ));
define('SERVEX_URL', trailingslashit( plugins_url('/', __FILE__) ));

class ServiceExpressBlock {
    function __construct() {
        add_filter( 'block_categories_all', array($this, 'add_block_categories'), 10, 2 );
        add_action('init', array($this, 'register_block'));
        add_action( 'init', array($this, 'add_image_size') );
        add_filter( 'image_size_names_choose', array($this, 'add_custom_sizes') );
    }
    
    function add_image_size() {
        add_image_size( 'testimonialImage', 300, 200, array( 'center', 'center' ), true ); 
    }
    
    function add_custom_sizes( $sizes ) {
        return array_merge( $sizes, array(
            'testimonialImage' => __('Testimonial Image'),
        ) );
    }

    function add_block_categories( $block_categories, $editor_context ) {
        if ( ! empty( $editor_context->post ) ) {
            array_push(
                $block_categories,
                array(
                    'slug'  => 'service-express',
                    'title' => __( 'Service Express Custom Blocks', 'servex' ),
                    'icon'  => 'admin-site',
                )
            );
        }
        return $block_categories;
    }

    function register_block() {
        // Return early if not using the block editor
        if ( ! function_exists( 'register_block_type' ) ) {
            return;
        }

        // Use asset files @wordpress scripts gives us for assets and versions
        $assets = include(SERVEX_PATH . 'build/index.asset.php');

        // Register scripts and styles
        wp_register_script('servex-editor-script', SERVEX_URL . 'build/index.js', $assets['dependencies'], $assets['version'] );

        wp_register_style('servex-editor-styles', SERVEX_URL . 'build/index.css', array( 'wp-edit-blocks' ), $assets['version'] );

        wp_register_style('servex-frontend-styles', SERVEX_URL . 'build/index.css', $assets['version']  );

        register_block_type( 'servex/testimonial', array(
            'editor_script' => 'servex-editor-script',
            'editor_style' => 'servex-editor-styles',
            'style' => 'servex-frontend-styles',
        ) );	  

    }

}

$serviceExpressBlock = new ServiceExpressBlock();