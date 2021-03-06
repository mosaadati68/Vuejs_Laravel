<template>
    <main-layout :class="[contentClass]">
        <v-container fluid grid-list-md>
            <v-layout row wrap>
                <v-breadcrumbs icons divider="navigate_before">
                    <v-breadcrumbs-item
                            active-class="primary--text"
                            :disabled="false"
                            to="/"
                    >
                        صفحه اصلی
                    </v-breadcrumbs-item>
                    <v-breadcrumbs-item
                            :disabled="true"
                    >
                        <span class="blue-grey--text">محصولات</span>
                    </v-breadcrumbs-item>
                </v-breadcrumbs>
            </v-layout>
            <v-layout row wrap>
                <v-flex
                        xs12 sm12 md3 lg3 xl3
                        v-for="(product,index) in products"
                        :key="product.slug" :index="index"
                >
                    <v-card>
                        <v-card-media style="border-radius: 10px"
                                      :src="product.image"
                                      height="200px"
                        >
                            <v-container fill-height fluid>
                                <v-layout fill-height>
                                    <v-flex xs12 align-end flexbox>
                                        <span class="body-2 white--text accent" v-text="product.name"></span>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-card-media>
                        <v-card-actions class="accent">
                            <span class="body-2">{{product.price}} ریال</span>

                            <v-spacer></v-spacer>
                            <v-btn flat icon color="primary" slot="activator" @click.native="showProduct(product.slug)">
                                <v-icon>fa-shopping-bag </v-icon>
                            </v-btn>
                            <!-- Add Other Action buttons Here -->
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
            <v-layout v-if="!noPagination" row wrap>
                <v-flex xs12>
                    <div class="text-xs-center">
                        <v-pagination
                                :length="length"
                                v-model.number="page"
                                circle
                        >
                        </v-pagination>
                    </div>
                </v-flex>
                <v-flex xs12 height="50px">
                </v-flex>
            </v-layout>
            <!-- If No Pagination Then Add 50px Height -->
            <v-layout v-else row wrap height="50">

            </v-layout>
        </v-container>
        </v-flex>
        </v-layout>
    </main-layout>
</template>

<script>
    import MainLayout from '../layouts/Main.vue'
    import Theme from '../mixins/theme'
    import {createNamespacedHelpers} from 'vuex'

    const {mapActions, mapGetters} = createNamespacedHelpers('cart')

    export default {
        props: ['query'],
        mixins: [Theme],
        components: {
            MainLayout
        },
        data: () => ({
            contentClass: {'grey': true, 'lighten-4': true, 'accent--text': true},
            currency: '₱',
            products: [],
            links: {
                first: null,
                last: null,
                prev: null,
                next: null
            },
            meta: {
                current_page: 1,
                from: 0,
                last_page: 0,
                path: null,
                per_page: 0,
                to: 0,
                total: 0
            },
            page: 1
        }),
        computed: {
            ...mapGetters({
                getItems: 'getItems'
            }),
            length() {
                let self = this
                return Math.round(self.meta.total / (self.meta.per_page))
            },
            noPagination() {
                let self = this
                if (self.meta.total === self.meta.per_page) {
                    return true
                } else if (self.meta.per_page > self.meta.total) {
                    return true
                } else {
                    return false
                }
            }
        },
        created() {
            /* important if redirecting back to populate our product list */
            this.getProducts()
        },
        mounted() {
            let self = this
            self.page = parseInt(self.query.page)
        },
        methods: {
            showProduct(slug) {
                let self = this
                self.$router.push({name: 'product.show', params: {slug: slug}})
            },
            viewCart() {
                let self = this
                self.$router.push({name: 'cart'})
            },
            async getProducts() {
                let self = this
                let page = self.$route.query.page || 1
                await axios.get(`${route('api.product.index')}/?page=${page}`).then((response) => {
                    self.products = response.data.data
                    self.links = response.data.links
                    self.meta = response.data.meta
                }).catch(({errors, message}) => {
                    console.log(errors)
                    vm.$popup({message: message, backgroundColor: '#e57373', delay: 5, color: '#fffffa'})
                })
            },
            async loadProducts() {
                let self = this
                await axios.get(`${route('api.product.index')}/?page=${self.page}`).then((response) => {
                    self.products = response.data.data
                    self.links = response.data.links
                    self.meta = response.data.meta

                    vm.$popup({
                        message: `Product Page: ${self.page}`,
                        backgroundColor: '#4db6ac',
                        delay: 5,
                        color: '#fffffa'
                    })
                }).catch(({errors, message}) => {
                    console.log(errors)
                    vm.$popup({message: message, backgroundColor: '#e57373', delay: 5, color: '#fffffa'})
                })
            }
        },
        watch: {
            products: {
                handler: function () {
                    console.log('Products Array Updated')
                },
                deep: true
            },
            /* change page value then */
            page(newValue) {
                let self = this
                self.page = newValue
                self.$router.push({name: 'product.index', query: {page: newValue}})
                vm.$popup({
                    message: `Product Page: ${self.page}`,
                    backgroundColor: '#4db6ac',
                    delay: 5,
                    color: '#fffffa'
                })
            },
            /* after change page and new route is push then load new products */
            '$route': 'loadProducts'

        }
    }
</script>

<style scoped>
    .breadcrumbs li:not(:last-child):after {
        color: #009688;
        content: attr(data-divider);
        vertical-align: middle;
    }
</style>
