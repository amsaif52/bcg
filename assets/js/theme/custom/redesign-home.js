import $ from 'jquery';
import PageManager from '../page-manager';

export default class Page extends PageManager {
    onReady() {
        const self = this;
        $(window).on('load resize orientationchange', () => {
            self.callSlick();
        });
        self.callSlick();
        self.applyHeroSlick();
        self.applyNewsSlick();
    }

    callSlick() {
        const self = this;
        self.applyArticleSlick();
    }

    applyArticleSlick() {
        $('.article-container').each(function () {
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
                    dots: true,
                });
            }
        });
        $('.article-container').on('afterChange', (event) => {
            if ($(event.currentTarget).find('.article.slick-active').hasClass('white')) {
                $('button.slick-next').addClass('white');
                $('button.slick-prev').addClass('white');
            } else {
                $('button.slick-next').removeClass('white');
                $('button.slick-prev').removeClass('white');
            }
        });
    }
    applyNewsSlick() {
        $('.section-5-carousel').each(function () {
            const $carousel = $(this);
            if (!$carousel.hasClass('slick-initialized')) {
                $carousel.slick({
                    slidesToShow: 6,
                    slidesToScroll: 1,
                    arrows: true,
                    dots: true,
                    responsive: [
                        {
                            breakpoint: 800,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1,
                                arrows: true,
                                dots: true,
                            },
                        },
                    ],
                });
            }
        });
    }

    applyHeroSlick() {
        $('.slick-context').each(function () {
            const $carousel = $(this);
            if (!$carousel.hasClass('slick-initialized')) {
                $carousel.slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    dots: true,
                    responsive: [
                        {
                            breakpoint: 800,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1,
                                arrows: false,
                                dots: true,
                            },
                        },
                    ],
                });
            }
        });
    }
}
