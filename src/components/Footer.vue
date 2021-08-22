<template>
    <footer class="footer footer-custom">
        <div class="container text-center text-white">
            <div class="promo">
                <div>
                    <p>
                      <span style="margin-right: 5px">Powered by Aristotle Metadata Registry</span>
                    </p>
                </div>
            </div>
        </div>
    </footer>
</template>

<style scoped>
.footer-custom {
    /* Dont grow or shrink footer */
    flex: 0 0 auto;
    width: 100%;
    background-color: midnightblue;
    padding-top: 10px;
    padding-bottom: 5px;
}

footer .promo {
    display: table;
    margin: auto;
}

footer .promo > div {
    display:table-cell;
    vertical-align: middle;
}

footer .promo p {
    margin: 0.1em;
}
</style>
