import $ from 'jquery';
import PageManager from '../page-manager';

export default class Page extends PageManager {
    onReady() {
        const self = this;
        self.callSlick();
        /* Slick needs no get Reinitialized on window Resize after it was destroyed */
        $(window).on('load resize orientationchange', () => {
            self.callSlick();
        });
    }

    callSlick() {
        $('.featureCategoryProducts').each(function () {
            const $carousel = $(this);
            if ($(window).width() > 800) {
                if ($carousel.hasClass('slick-initialized')) {
                    $carousel.slick('unslick');
                }
            } else if (!$carousel.hasClass('slick-initialized')) {
                $carousel.slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: true,
                    dots: false,
                    focusOnSelect: true,
                });
            }
        });
    }
}
