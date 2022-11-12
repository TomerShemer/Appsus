export default {
    props: ['book'],
    template: `
        <section class="book-preview">
            <section className="img-container">
                <img :src="book.thumbnail" alt="" />
            </section>
            <section className="book-preview-info">
                <h2>{{book.title}}</h2>
                <h3>{{bookPrice}}</h3>
                <router-link :to="'/book/' + book.id">
                    <button class="btn-black">Details</button>
                </router-link>
            </section>
        </section>
    `,
    computed: {
        bookPrice() {
            const priceData = this.book.listPrice
            const price = new Intl.NumberFormat('he-IL', { style: 'currency', currency: `${priceData.currencyCode}` }).format(priceData.amount)
            return price
        }
    },
}