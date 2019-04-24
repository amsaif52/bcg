import PageManager from '../../page-manager';
import $ from 'jquery';

export default class HeaderScripts extends PageManager {
    onReady() {
        // const self = this;
        const $dropbtn = $('.dropdown1');
        const $mobileDropBtn = $('.dropbutn');
        const $mainHeader = $('header.header.gillette-us');
        const $searchDropdown = $('.search > a, .dropdown.dropdown--quickSearch');
        const $mobileMenuToggle = $('.mobileMenu-toggle');
        const $mobileSearch = $('.mSearch > a');
        $dropbtn.mouseenter((e) => {
            $(e.currentTarget).addClass('blue');
            $mainHeader.removeClass('blue');
        }).mouseleave((e) => {
            $(e.currentTarget).removeClass('blue');
            $mainHeader.addClass('blue');
        });
        $mobileDropBtn.on('click', (e) => {
            $mobileDropBtn.each((idx, val) => {
                if (val !== e.currentTarget) {
                    $(val).removeClass('blue-mobile');
                    $(val).parent().find('.dropdown-mobile-content').css('display', 'none');
                }
            });
            $('.mSearch').removeClass('search-mobile');
            if ($(e.currentTarget).hasClass('blue-mobile')) {
                $mainHeader.removeClass('blue-mobile');
                $(e.currentTarget).removeClass('blue-mobile');
                $(e.currentTarget).parent().find('.dropdown-mobile-content').css('display', 'none');
            } else {
                $mainHeader.addClass('blue-mobile');
                $(e.currentTarget).addClass('blue-mobile');
                $(e.currentTarget).parent().find('.dropdown-mobile-content').css('display', 'block');
            }
        });
        $mobileMenuToggle.on('click', () => {
            if ($($mainHeader).hasClass('blue-mobile')) {
                $($mainHeader).removeClass('blue-mobile');
                $('.mSearch').removeClass('search-mobile');
                $mobileDropBtn.each((idx, val) => {
                    $(val).removeClass('blue-mobile');
                    $(val).parent().find('.dropdown-mobile-content').css('display', 'none');
                });
            }
        });
        $searchDropdown.mouseenter(() => {
            $searchDropdown.addClass('hover');
            $mainHeader.removeClass('blue');
            $('a.navUser-action--quickSearch').click();
        }).mouseleave(() => {
            $searchDropdown.removeClass('hover');
            $mainHeader.addClass('blue');
            $('a.navUser-action--quickSearch').click();
        });
        $mobileSearch.on('click', (e) => {
            e.preventDefault();
            $mainHeader.removeClass('blue-mobile');
            $mobileDropBtn.each((idx, val) => {
                $(val).removeClass('blue-mobile');
                $(val).parent().find('.dropdown-mobile-content').css('display', 'none');
            });
            if ($(e.currentTarget).parent().hasClass('search-mobile')) {
                $(e.currentTarget).parent().removeClass('search-mobile');
            } else {
                $(e.currentTarget).parent().addClass('search-mobile');
            }
        });
    }
}
