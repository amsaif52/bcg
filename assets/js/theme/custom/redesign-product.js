import $ from 'jquery';
import PageManager from '../page-manager';

export default class Page extends PageManager {
    onReady() {
        const self = this;
        self.makeAccordion();
        self.totalProductCost();
        $(window).on('load resize orientationchange', () => {
            this.applySteps();
        });
    }
    totalProductCost() {
        const self = this;
        const myProductName = self.context.myProductName;
        const myProductPrice = myProductName.price.without_tax.value;
        const totalProductPrice = myProductName.related_products.reduce((acc, val) => acc + val.price.without_tax.value, myProductPrice);
        const mobilePrice = $('.productView-products.mobileonly .productsAdd .price');
        const desktopPrice = $('.productView-products.desktoponly .prodPrice .price');
        mobilePrice.text(`$${totalProductPrice}`);
        desktopPrice.text(`$${totalProductPrice}`);
    }
    makeAccordion() {
        $('.accordion').on('click', (e) => {
            const $panel = $(e.currentTarget).parent().find('.panel');
            if ($(e.currentTarget).hasClass('active')) {
                $(e.currentTarget).removeClass('active');
                $panel.css('max-height', '0%');
            } else {
                $(e.currentTarget).addClass('active');
                $panel.css('max-height', '100%');
            }
        });
    }
    applySteps() {
        $('.productView-mobile-images').each(function () {
            const $carousel = $(this);
            if ($(window).width() > 800) {
                if ($carousel.hasClass('slick-initialized')) {
                    $carousel.slick('unslick');
                }
            } else if (!$carousel.hasClass('slick-initialized')) {
                $carousel.slick({
                    arrows: true,
                    dots: true,
                    infinite: true,
                    speed: 300,
                    slidesToShow: 1,
                });
            }
        });
    }
}
