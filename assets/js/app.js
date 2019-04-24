__webpack_public_path__ = window.__webpack_public_path__; // eslint-disable-line

import Global from './theme/global';

const getAccount = () => import('./theme/account');
const getLogin = () => import('./theme/auth');
const noop = null;

const pageClasses = {
    account_orderstatus: getAccount,
    account_order: getAccount,
    account_addressbook: getAccount,
    shippingaddressform: getAccount,
    account_new_return: getAccount,
    'add-wishlist': () => import('./theme/wishlist'),
    account_recentitems: getAccount,
    account_downloaditem: getAccount,
    editaccount: getAccount,
    account_inbox: getAccount,
    account_saved_return: getAccount,
    account_returns: getAccount,
    account_paymentmethods: getAccount,
    account_addpaymentmethod: getAccount,
    account_editpaymentmethod: getAccount,
    login: getLogin,
    createaccount_thanks: getLogin,
    createaccount: getLogin,
    getnewpassword: getLogin,
    forgotpassword: getLogin,
    blog: noop,
    blog_post: noop,
    brand: () => import('./theme/brand'),
    brands: noop,
    cart: () => import('./theme/cart'),
    category: () => import('./theme/category'),
    compare: () => import('./theme/compare'),
    page_contact_form: () => import('./theme/contact-us'),
    error: noop,
    404: noop,
    giftcertificates: () => import('./theme/gift-certificate'),
    giftcertificates_balance: () => import('./theme/gift-certificate'),
    giftcertificates_redeem: () => import('./theme/gift-certificate'),
    default: noop,
    page: noop,
    product: () => import('./theme/product'),
    amp_product_options: () => import('./theme/product'),
    search: () => import('./theme/search'),
    rss: noop,
    sitemap: noop,
    newsletter_subscribe: noop,
    wishlist: () => import('./theme/wishlist'),
    wishlists: () => import('./theme/wishlist'),
    custom_header_scripts: () => import('./theme/custom/global/headerScripts'),
    pages_custom_page_redesign_home: () => import('./theme/custom/redesign-home'),
    pages_custom_category_redesign_shave: () => import('./theme/custom/redesign-shave'),
};

// const customClasses = {};

/**
 * This function gets added to the global window and then called
 * on page load with the current template loaded and JS Context passed in
 * @param pageType String
 * @param contextJSON
 * @returns {*}
 */
window.stencilBootstrap = function stencilBootstrap(pageType, contextJSON = null, loadGlobal = true) {
    const context = JSON.parse(contextJSON || '{}');

    return {
        load() {
            $(async() => {
                // Load globals
                if (loadGlobal) {
                    Global.load(context);
                }

                // Find the appropriate page loader based on pageType
                const pageClassImporter = pageClasses[pageType];
                if (typeof pageClassImporter === 'function') {
                    const PageClass = (await pageClassImporter()).default;
                    PageClass.load(context);
                }
                
                if ((pageType === 'page' || pageType === 'category') && context.template) {
                    const mightBeTemplatePage = context.template.replace(new RegExp('/', 'g'), '_').replace(new RegExp('\\\\', 'g'), '_').replace(new RegExp('-', 'g'), '_');
                    const customPageClassImporter = pageClasses[mightBeTemplatePage];
                    if (typeof customPageClassImporter === 'function') {
                        const customPageClass = (await customPageClassImporter()).default;
                        customPageClass.load(context);
                    }
                }

                // enable global scripts
                const headerModule = (await pageClasses.custom_header_scripts()).default;
                headerModule.load(context);
            });
        },
    };
};
