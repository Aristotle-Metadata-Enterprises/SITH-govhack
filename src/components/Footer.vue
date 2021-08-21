<template>
    <footer class="footer footer-custom">
        <div class="container text-center text-white">
            <div class="promo">
                <div>
                    <p>
                        <a href="https://github.com/Aristotle-Metadata-Enterprises/aristotle-labs" class="text-white">
                            <i class="fab fa-github" />
                            Aristotle Labs
                        </a>
                            - powered by the Aristotle Metadata Registry
                    </p>
                    <p>© 2020 Copyright:
                        <a class="text-white" href="https://aristotlemetadata.com/">Aristotle Metadata Enterprises</a>
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
    background-color: #356a69;
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
