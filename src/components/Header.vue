<template>
    <nav class="navbar navbar-custom navbar-expand-lg">
        <router-link class="navbar-brand" :to="{name: 'mainPage'}">
            <i class="fab fa-sith"></i>
            Skills Interactive Transferability Handbook
        </router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon" />
        </button>
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
