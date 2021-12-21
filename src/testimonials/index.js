import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";
import {
  MediaUpload,
  RichText,
  MediaUploadCheck,
  InspectorControls,
} from "@wordpress/block-editor";
import { Button, PanelBody, PanelRow } from "@wordpress/components";
import { ChromePicker } from "react-color";
import defaultImage from "../../images/testimonial-image.jpg";
import { ReactComponent as QuoteIcon } from "../../images/quote-right-solid.svg";

registerBlockType("servex/testimonial", {
  title: __("Service Express Testimonial", "servex"),
  icon: { src: QuoteIcon },
  category: "service-express",
  attributes: {
    testimonialText: {
      type: "string",
      source: "html",
      selector: ".testimonial__text",
    },
    testimonialName: {
      type: "string",
      source: "html",
      selector: ".testimonial__name",
    },
    testimonialImage: {
      type: "string",
      source: "attribute",
      selector: ".testimonial__img",
      attribute: "src",
      default: defaultImage,
    },
    testimonialImageAlt: {
      type: "string",
      source: "attribute",
      selector: ".testimonial__img",
      attribute: "alt",
      default: "Testimonial Image",
    },
    textColor: {
      type: "string",
      default: "#141b21",
    },
    quoteColor: {
      type: "string",
      default: "#1a70c3",
    },
    align: {
      type: "string",
      default: "full",
    },
  },
  supports: {
    align: ["full"],
  },
  edit: EditComponent,
  save: SaveComponent,
});

function EditComponent({
  attributes: {
    testimonialText,
    testimonialName,
    testimonialImage,
    testimonialImageAlt,
    textColor,
    quoteColor,
  },
  className,
  setAttributes,
}) {
  const testimonalTextHandleChange = (newTestimonialText) => {
    setAttributes({ testimonialText: newTestimonialText });
  };
  const testimonalNameHandleChange = (newTestimonialName) => {
    setAttributes({ testimonialName: newTestimonialName });
  };
  const onImageSelect = (newImg) => {
    setAttributes({ testimonialImage: newImg.sizes.testimonialImage.url });
    setAttributes({ testimonialImageAlt: newImg.alt });
  };
  return (
    <div className={`testimonial ${className}`}>
      <InspectorControls>
        <PanelBody title="Text Color" initialOpen={false}>
          <PanelRow>
            <ChromePicker
              color={textColor}
              onChangeComplete={(x) => setAttributes({ textColor: x.hex })}
              disableAlpha={true}
            />
          </PanelRow>
        </PanelBody>
        <PanelBody title="Quote Color" initialOpen={false}>
          <PanelRow>
            <ChromePicker
              color={quoteColor}
              onChangeComplete={(x) => setAttributes({ quoteColor: x.hex })}
              disableAlpha={true}
            />
          </PanelRow>
        </PanelBody>
      </InspectorControls>
      <div className="testimonial__content" style={{ color: textColor }}>
        <div className="testimonial__img-container">
          <img
            src={testimonialImage}
            alt={testimonialImageAlt}
            className="testimonial__img"
            style={{ maxWidth: "300px", display: "block" }}
          />
          <MediaUploadCheck>
            <MediaUpload
              onSelect={onImageSelect}
              type="image"
              value={testimonialImage}
              render={({ open }) => (
                <Button
                  className="testimonial__button"
                  onClick={open}
                  isSecondary
                >
                  Open Media Library
                </Button>
              )}
            />
          </MediaUploadCheck>
        </div>
        <p className="testimonial__text">
          <RichText
            onChange={testimonalTextHandleChange}
            placeholder={__(
              '"This is my great testimonial for Service Express. They are amazing!"',
              "servex"
            )}
            value={testimonialText}
          />
        </p>
        <p className="testimonial__name">
          <RichText
            onChange={testimonalNameHandleChange}
            placeholder={__("Namey McNamerson", "servex")}
            value={testimonialName}
          />
        </p>
        <div
          className="testimonial__quote"
          style={{ backgroundColor: quoteColor }}
        >
          {<QuoteIcon />}
        </div>
      </div>
    </div>
  );
}
function SaveComponent({
  attributes: {
    testimonialText,
    testimonialName,
    testimonialImage,
    testimonialImageAlt,
    textColor,
    quoteColor,
  },
}) {
  return (
    <div className={`testimonial`}>
      <div className="testimonial__content" style={{ color: textColor }}>
        <div className="testimonial__img-container">
          <img
            src={testimonialImage}
            alt={testimonialImageAlt}
            className="testimonial__img"
            style={{ maxWidth: "300px" }}
          />
        </div>
        <p className="testimonial__text">
          <RichText.Content value={testimonialText} />
        </p>
        <p className="testimonial__name">
          <RichText.Content value={testimonialName} />
        </p>
        <div
          className="testimonial__quote"
          style={{ backgroundColor: quoteColor }}
        >
          {<QuoteIcon />}
        </div>
      </div>
    </div>
  );
}
