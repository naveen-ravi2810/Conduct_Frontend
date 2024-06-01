async function get_user(){
    console.log("Hello world")
}

async function exam() {
    await setTimeout(get_user, 5000);
    await setTimeout(get_user, 5000);
    await setTimeout(get_user, 5000);
    await setTimeout(get_user, 5000);
    await setTimeout(get_user, 5000);
}

// t_out;

exam();