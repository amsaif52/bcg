import $ from 'jquery';
import PageManager from '../page-manager';

export default class Page extends PageManager {
    onReady() {
        const self = this;
        self.makeAccordion();
    }
    makeAccordion() {
        $('.accordion').on('click', (e) => {
            const $panel = $(e.currentTarget).parent().find('.panel');
            const panelHeight = $panel.innerHeight();
            if ($(e.currentTarget).hasClass('active')) {
                $(e.currentTarget).removeClass('active');
                $panel.css('max-height','0%');
            } else {
                $(e.currentTarget).addClass('active');
                $panel.css('max-height', '100%');
            }
        });
    }
}