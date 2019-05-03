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
        const $desktopHeader = $('button.dropbtn');
        const $ul = $('.menu.vertical.medium-horizontal');
        $(document).on('click', (e) => {
            if ($ul.has(e.target).length === 0 && !$ul.is(e.target)) {
                $dropbtn.removeClass('hover blue');
                $mainHeader.addClass('blue');
                $searchDropdown.removeClass('hover');
            }
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
            if ($($mainHeader).hasClass('blue-mobile') || $($mainHeader).hasClass('is-open')) {
                $($mainHeader).removeClass('blue-mobile');
                $('.mSearch').removeClass('search-mobile');
                $mobileDropBtn.each((idx, val) => {
                    $(val).removeClass('blue-mobile');
                    $(val).parent().find('.dropdown-mobile-content').css('display', 'none');
                });
            }
        });
        // $searchDropdown.mouseenter(() => {
        //     $searchDropdown.addClass('hover');
        //     $mainHeader.removeClass('blue');
        //     $('a.navUser-action--quickSearch').click();
        // }).mouseleave(() => {
        //     $searchDropdown.removeClass('hover');
        //     $mainHeader.addClass('blue');
        //     $('a.navUser-action--quickSearch').click();
        // });
        $searchDropdown.on('click', () => {
            if ($searchDropdown.hasClass('hover')) {
                $searchDropdown.removeClass('hover');
                $mainHeader.addClass('blue');
                $('.dropdown.dropdown--quickSearch').removeClass('is-open f-open-dropdown');
            } else {
                $dropbtn.removeClass('hover blue');
                $searchDropdown.addClass('hover');
                $mainHeader.removeClass('blue');
                $('.dropdown.dropdown--quickSearch').addClass('is-open f-open-dropdown');
            }
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
        $desktopHeader.on('click', (e) => {
            e.preventDefault();
            const $currentHeaderTab = $(e.currentTarget);
            const $currentHeaderTabParent = $currentHeaderTab.parent();
            if ($currentHeaderTabParent.hasClass('hover')) {
                $currentHeaderTabParent.removeClass('hover');
                $currentHeaderTabParent.removeClass('blue');
                $mainHeader.addClass('blue');
            } else {
                $searchDropdown.removeClass('hover');
                $dropbtn.removeClass('hover blue');
                $currentHeaderTabParent.addClass('hover');
                $currentHeaderTabParent.addClass('blue');
                $mainHeader.removeClass('blue');
            }
        });
        $('input.redesignCheckbox').on('click', (e) => {
            const inputChangeType = $(e.currentTarget).parent().find('.form-input');
            const inputType = inputChangeType.attr('type');
            if (inputType === 'text') {
                inputChangeType.attr('type', 'password');
            } else {
                inputChangeType.attr('type', 'text');
            }
        });
    }
}
