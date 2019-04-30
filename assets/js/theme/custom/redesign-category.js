import $ from 'jquery';
import PageManager from '../page-manager';

export default class Page extends PageManager {
    onReady() {
        this.openAcc();
        /* Slick needs no get Reinitialized on window Resize after it was destroyed */
        $(window).on('load resize orientationchange', () => {
            this.isopenFunc();
        });
        this.checkProductGrid();
        this.addCheckMutationEvents();
    }
    checkProductGrid() {
        $('.productGrid').each((idx, value) => {
            console.log(idx);
            if (!($(value).find('li').length > 0)) {
                $(value).parent().css('display', 'none');
            }
        });
    }
    isopenFunc() {
        if ($(window).width() > 800) {
            $('.accordion-content, .accordion-navigation.toggleLink').addClass('is-open');
        } else {
            $('.accordion-content, .accordion-navigation.toggleLink').removeClass('is-open');
            const $filterBlock = $('.filterTitle-block.mobileonly');
            $filterBlock.removeClass('is-open');
            $filterBlock.parent().find('> div, > form, > h5').not('.filterTitle-block.mobileonly,.filterTitle-block.desktoponly').removeClass('is-open');
        }
    }
    openAcc() {
        const $filterMobile = $('.filterTitle-block.mobileonly');
        $filterMobile.on('click', (e) => {
            const $first = $(e.currentTarget);
            if ($first.hasClass('is-open')) {
                $first.removeClass('is-open');
                $first.parent().find('> div, > form, > h5').not('.filterTitle-block.mobileonly,.filterTitle-block.desktoponly').removeClass('is-open');
            } else {
                $first.addClass('is-open');
                $first.parent().find('> div, > form, > h5').not('.filterTitle-block.mobileonly, .filterTitle-block.desktoponly').addClass('is-open');
            }
        });
    }
    addCheckMutationEvents() {
        const self = this;
        // Options for the observer (which mutations to observe)
        const config = { attributes: false, childList: true, subtree: true };
        const callback = function (mutationsList) {
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    if (mutation.target.className && mutation.target.className.includes('page-sidebar')) {
                        self.checkProductGrid();
                        if ($(window).width() > 800) {
                            $('.accordion-content').addClass('is-open');
                        } else {
                            self.openAcc();
                        }
                    }
                }
            }
        };
        // Create an observer instance linked to the callback function
        const observer = new MutationObserver(callback);

        // Start observing the target node for configured mutations
        observer.observe(document.body, config);
    }
}
