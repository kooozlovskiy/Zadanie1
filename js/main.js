Vue.component('product-details', {
    props: {
        details: {
            type: Array,
            required: true
        }
    },
    templates: `
    <ul>
        <li v-for="detail in details">{{ detail }}</li>
    </ul>
    `,

})


Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
    <div class="product">
        <div class="product-image">
            <img alt="#" :src="image">
        </div>
        <div class="product-info">
            <h1>{{ title }}</h1>
            <p>A pair of warm, fuzzy socks.</p>
            <a href="https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks">{{link}} </a>
                <p v-if="inStock">In Stock</p>
                <p v-else :class="{ 'line': !inStock }">Out of Stock</p>
                <p v-else-if="inventory <= 10 && inventory > 0">Almost sold out!</p>
                <p v-else>Out of Stock</p>
                <span>OnSale</span>
                <ul>
                    <li v-for="size in sizes">{{ size }}</li>
                </ul>
            <div class="cart">
                <p>Cart({{ cart }})</p>
            </div>
            <div
                    class="color-box"
                    v-for="(variant, index) in variants"
                    :key="variant.variantId"
                    :style="{ backgroundColor:variant.variantColor }"
                    @mouseover="updateProduct(index)"
            >

            </div>
            <button v-on:click="addToCart":disabled="!inStock"
                    :class="{ disabledButton: !inStock }"
            >Add to cart</button>
            <button v-on:click="delToCart">Delete from cart</button>
            <span>{{ sale }}</span>
            <p>Shipping: {{ shipping }}</p>
             <product-detail :details="details"> </product-detail>
        </div>
        
    </div>
 `,
    data() {
        return {
            product: "Socks",
            brand: 'Vue Mastery',
            selectedVariant: 0,
            altText: "A pair of socks",
            link: "More products like this.",
            onSale: true,
            inventory: 100,
            details: ['80% cotton', '20% polyester', 'Gender-neutral'],

            sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
            cart: 0,
            variants: [
                {
                    variantId: 2234,
                    variantColor: 'green',
                    variantImage: "./assets/vmSocks-green-onWhite.jpg",
                    variantQuantity: 10
                },
                {
                    variantId: 2235,
                    variantColor: 'blue',
                    variantImage: "./assets/vmSocks-blue-onWhite.jpg",
                    variantQuantity: 0
                }
            ],


        }
        },

    methods: {
        addToCart() {
            this.cart += 1
        },
        updateProduct(index) {
            this.selectedVariant = index;
        },

        delToCart() {
            if (this.cart >= 0) {
                this.cart -= 1
            }
        },
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product;
        },
        image() {
            return this.variants[this.selectedVariant].variantImage;
        },
        inStock(){
            return this.variants[this.selectedVariant].variantQuantity
        },
        sale(){
            return this.onSale ? `${this.brand} ${this.product} is on sale!` : `${this.brand} ${this.product} is not on sale.`;
        },
        shipping() {
            if (this.premium) {
                return "Free";
            } else {
                return 2.99
            }
        },

    }


})

let app = new Vue({
    el: '#app',
    data: {
        premium: true,

    }
})


