/* eslint-disable no-undef */
/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

// The editor creator to use.
import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import UploadAdapter from '@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';
import EasyImage from '@ckeditor/ckeditor5-easy-image/src/easyimage';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize';
import Indent from '@ckeditor/ckeditor5-indent/src/indent';
import Link from '@ckeditor/ckeditor5-link/src/link';
import List from '@ckeditor/ckeditor5-list/src/list';
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import TextTransformation from '@ckeditor/ckeditor5-typing/src/texttransformation';
import CloudServices from '@ckeditor/ckeditor5-cloud-services/src/cloudservices';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import WProofreader from '@webspellchecker/wproofreader-ckeditor5/src/wproofreader';
import imageIcon from '@ckeditor/ckeditor5-core/theme/icons/image.svg';
import cutIcon from './cut.svg';
import copyIcon from './copy.svg';
class PastePlainTextUI extends Plugin {
	init() {
		const editor = this.editor;
		addButton( 'copy', 'Copy', copyIcon );
		addButton( 'cut', 'Cut', cutIcon );

		function addButton( action, label, icon ) {
			editor.ui.componentFactory.add( action, locale => {
				const view = new ButtonView( locale );

				view.set( {
					withText: true,
					tooltip: true,
					icon
				} );

				view.on( 'execute', () => {
					document.execCommand( action );
				} );

				return view;
			} );
		}
	}
}

class InsertImage extends Plugin {
	init() {
		const editor = this.editor;

		editor.ui.componentFactory.add( 'insertImage', locale => {
			const view = new ButtonView( locale );

			view.set( {
				label: 'Insert image',
				icon: imageIcon,
				tooltip: true
			} );

			// Callback executed once the image is clicked.
			view.on( 'execute', () => {
				// eslint-disable-next-line no-alert
				const imageUrl = prompt( 'Image URL' );

				editor.model.change( writer => {
					const imageElement = writer.createElement( 'imageBlock', {
						src: imageUrl
					} );

					// Insert the image in the current selection location.
					editor.model.insertContent( imageElement, editor.model.document.selection );
				} );
			} );

			return view;
		} );
	}
}

export default class ClassicEditor extends ClassicEditorBase {}

// Plugins to include in the build.
ClassicEditor.builtinPlugins = [
	Essentials,
	UploadAdapter,
	Autoformat,
	Bold,
	Italic,
	BlockQuote,
	CKFinder,
	CloudServices,
	EasyImage,
	Heading,
	Image,
	ImageCaption,
	ImageStyle,
	ImageToolbar,
	ImageUpload,
	Indent,
	Link,
	List,
	MediaEmbed,
	Paragraph,
	PasteFromOffice,
	Table,
	TableToolbar,
	TextTransformation,
	PastePlainTextUI,
	WProofreader,
	ImageResize,
	InsertImage
];

// Editor configuration.
ClassicEditor.defaultConfig = {
	toolbar: {
		items: [
			'copy',
			'cut',
			'|',
			'undo',
			'redo',
			'|',
			'wproofreader',
			'|',
			'link',
			'|',
			'InsertImage',
			'mediaEmbed',
			'|',
			'-',
			'bold',
			'italic',
			'underline',
			'Strikethrough',
			'|',
			'alignment',
			'|',
			'bulletedList',
			'numberedList',
			'|',
			'blockQuote',
			'|',
			'heading'
		]
	},
	image: {
		toolbar: [
			'imageStyle:inline',
			'imageStyle:block',
			'imageStyle:side',
			'|',
			'toggleImageCaption',
			'imageTextAlternative'
		]
	},
	alignment: {
		options: [ 'left', 'right', 'center', 'justify' ]
	},
	language: 'en',
	wproofreader: {
		lang: 'en_US', // sets the default language
		serviceId: 'VgpyX435O74ihVB', // required for the Cloud version only
		srcUrl: 'https://svc.webspellchecker.net/spellcheck31/wscbundle/wscbundle.js'
	}
};
