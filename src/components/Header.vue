<template>
    <nav class="navbar navbar-custom navbar-expand-lg">
        <router-link class="navbar-brand" :to="{name: 'homePage'}">
            <img class="img-fluid aristotle-logo" src="@/assets/aris_logo_small.png" alt="Aristotle Logo">
            Aristotle Labs
        </router-link>

        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon" />
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <router-link class="nav-link" :to="{name: 'homePage'}">
                        Home
                    </router-link>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                    >
                        Labs
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <router-link class="dropdown-item" :to="{name: 'covidGraph'}">
                            Covid Graph
                        </router-link>
                        <router-link class="dropdown-item" :to="{name: 'covidMap'}">
                            Covid Map
                        </router-link>
                        <router-link class="dropdown-item" :to="{name: 'sddf'}">
                            Simple Data Dictionary Format
                        </router-link>
                    </div>
                </li>
            </ul>
        </div>
        <a href="https://aristotlemetadata.com" class="btn btn-outline-light">
            Back to main site
        </a>
    </nav>
</template>

<style scoped>
/* Dont grow or shrink header */
.navbar-custom {
    flex: 0 0 auto;
}

/* Custom styling for navbar to make it aristotle green */
.navbar-custom {
    background-color: #356a69;
}

/* change the brand and text color */
.navbar-custom .navbar-brand,
.navbar-custom .navbar-text {
    color: white;
}

/* change the link color */
.navbar-custom .navbar-nav .nav-link {
    color: white;
}

/* change the color of active or hovered links */
.navbar-custom .nav-item.active .nav-link,
.navbar-custom .nav-item:hover .nav-link {
    color: white;
}

/* for dropdown only - change the color of droodown */
.navbar-custom .dropdown-menu {
    background-color: white;
}

.navbar-custom .dropdown-item {
    color: black;
}

.navbar-custom .dropdown-item:hover,
.navbar-custom .dropdown-item:focus {
    color: black;
    background-color: white;
}
</style>
