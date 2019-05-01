import $ from 'jquery';
import PageManager from '../page-manager';

export default class Page extends PageManager {
    onReady() {
        this.adChoice();
        this.contextCategory();
        console.log(this.context.category);
    }
    contextCategory() {
        const self = this;
        const category = this.context.category;
        const productId = parseInt((window.location.hash).replace('#', ''), 10);
        const product = category.products.filter((val) => val.id === productId)[0];
        console.log(self, product);
    }
    adChoice() {
        $('.subscription-option .sub').on('click', (e) => {
            $(e.currentTarget).parent().find('.sub').removeClass('choice');
            $(e.currentTarget).addClass('choice');
            $('.checkoutBtn').removeClass('notAllowed');
        });
    }
}
