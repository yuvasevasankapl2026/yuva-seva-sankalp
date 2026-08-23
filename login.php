<?php
session_start();

/* =========================================================
   LOGIN.PHP
   युवा सेवा संकल्प फाउंडेशन
   Member + Volunteer + Admin Login
========================================================= */


/* =========================================================
   ROLE SELECT
========================================================= */

$role = $_GET['role'] ?? $_POST['role'] ?? 'member';

$allowed_roles = [
    'member',
    'volunteer',
    'admin'
];

if (!in_array($role, $allowed_roles, true)) {
    $role = 'member';
}


/* =========================================================
   ROLE DETAILS
========================================================= */

$roleData = [

    'member' => [
        'title' => 'सदस्य Login',
        'subtitle' => 'अपने सदस्य खाते में लॉगिन करें',
        'icon' => 'fa-user',
        'color' => '#16843d',
        'dashboard' => 'member-dashboard.php'
    ],

    'volunteer' => [
        'title' => 'Volunteer Login',
        'subtitle' => 'अपनी सेवा गतिविधियों में लॉगिन करें',
        'icon' => 'fa-hands-helping',
        'color' => '#06295c',
        'dashboard' => 'volunteer-dashboard.php'
    ],

    'admin' => [
        'title' => 'Admin Login',
        'subtitle' => 'Administrator Panel में लॉगिन करें',
        'icon' => 'fa-user-shield',
        'color' => '#f36b12',
        'dashboard' => 'admin-dashboard.php'
    ]

];

$current = $roleData[$role];


/* =========================================================
   VARIABLES
========================================================= */

$error = '';
$success = '';

$email = '';


/* =========================================================
   LOGIN PROCESS
========================================================= */

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';

    if ($email === '' || $password === '') {

        $error = 'कृपया ईमेल और पासवर्ड दर्ज करें।';

    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {

        $error = 'कृपया सही ईमेल पता दर्ज करें।';

    } else {

        /*
        =====================================================
        TEMPORARY LOGIN

        अभी demonstration के लिए।

        DATABASE लगाने के बाद यहाँ password_verify()
        और database query लगाई जाएगी।
        =====================================================
        */

        if ($role === 'admin') {

            /*
            TEMPORARY ADMIN LOGIN

            बाद में इसे DATABASE से connect करें।

            Demo:
            Email: admin@yuvasevasankalp.org
            Password: admin123
            */

            if (
                $email === 'admin@yuvasevasankalp.org' &&
                $password === 'admin123'
            ) {

                $_SESSION['user_id'] = 1;
                $_SESSION['user_email'] = $email;
                $_SESSION['user_role'] = 'admin';
                $_SESSION['logged_in'] = true;

                header('Location: admin-dashboard.php');
                exit;

            } else {

                $error = 'Admin Email या Password गलत है।';

            }

        } else {

            /*
            =================================================
            MEMBER / VOLUNTEER

            Database आने के बाद यहाँ वास्तविक login होगा।
            =================================================
            */

            $error =
                'अभी Member/Volunteer का database login सक्रिय नहीं है।';
        }

    }

}

?>

<!DOCTYPE html>
<html lang="hi">

<head>

    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0">

    <title>
        <?php echo htmlspecialchars($current['title']); ?>
        | युवा सेवा संकल्प फाउंडेशन
    </title>


    <link
        rel="icon"
        href="images/logo.png">


    <link
        rel="preconnect"
        href="https://fonts.googleapis.com">


    <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossorigin>


    <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700;800&display=swap"
        rel="stylesheet">


    <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">


    <style>

        *{
            margin:0;
            padding:0;
            box-sizing:border-box;
        }


        body{

            font-family:
                "Noto Sans Devanagari",
                Mangal,
                Arial,
                sans-serif;

            min-height:100vh;

            background:
                linear-gradient(
                    135deg,
                    #eef5fb,
                    #f8fbff
                );

            color:#273444;

            display:flex;

            align-items:center;

            justify-content:center;

            padding:20px;

        }


        .login-wrapper{

            width:100%;

            max-width:1000px;

            display:grid;

            grid-template-columns:1fr 1fr;

            background:#fff;

            border-radius:22px;

            overflow:hidden;

            box-shadow:
                0 20px 60px
                rgba(6,41,92,.16);

        }


        /* =================================================
           LEFT
        ================================================= */

        .login-left{

            background:
                linear-gradient(
                    145deg,
                    #06295c,
                    #0b3b7a
                );

            color:#fff;

            padding:45px 40px;

            display:flex;

            flex-direction:column;

            justify-content:center;

            align-items:center;

            text-align:center;

            position:relative;

            overflow:hidden;

        }


        .login-left:before{

            content:"";

            position:absolute;

            width:300px;

            height:300px;

            border-radius:50%;

            background:
                rgba(255,255,255,.06);

            top:-120px;

            left:-100px;

        }


        .login-left:after{

            content:"";

            position:absolute;

            width:250px;

            height:250px;

            border-radius:50%;

            background:
                rgba(22,132,61,.18);

            bottom:-100px;

            right:-80px;

        }


        .logo{

            width:120px;

            height:120px;

            border-radius:50%;

            background:#fff;

            padding:8px;

            object-fit:contain;

            position:relative;

            z-index:2;

            margin-bottom:20px;

        }


        .login-left h1{

            font-size:28px;

            line-height:1.35;

            position:relative;

            z-index:2;

        }


        .login-left h1 span{

            color:#20a04b;

        }


        .login-left h1 strong{

            display:block;

            color:#ff8a18;

        }


        .tagline{

            margin-top:8px;

            color:#dbe8f7;

            font-size:14px;

            position:relative;

            z-index:2;

        }


        .left-message{

            margin-top:30px;

            font-size:14px;

            line-height:1.8;

            color:#dbe8f7;

            max-width:390px;

            position:relative;

            z-index:2;

        }


        .service-icons{

            display:flex;

            gap:12px;

            margin-top:25px;

            position:relative;

            z-index:2;

        }


        .service-icons div{

            width:45px;

            height:45px;

            border-radius:50%;

            display:grid;

            place-items:center;

            background:
                rgba(255,255,255,.12);

            font-size:18px;

        }


        .service-icons div:nth-child(1){
            color:#20a04b;
        }

        .service-icons div:nth-child(2){
            color:#ff8a18;
        }

        .service-icons div:nth-child(3){
            color:#fff;
        }

        .service-icons div:nth-child(4){
            color:#ff4b4b;
        }


        /* =================================================
           RIGHT
        ================================================= */

        .login-right{

            padding:45px;

            display:flex;

            flex-direction:column;

            justify-content:center;

        }


        .back-home{

            color:#687585;

            font-size:13px;

            display:inline-flex;

            align-items:center;

            gap:7px;

            margin-bottom:20px;

        }


        .back-home:hover{

            color:#06295c;

        }


        .login-icon{

            width:70px;

            height:70px;

            border-radius:50%;

            display:grid;

            place-items:center;

            background:
                <?php echo $current['color']; ?>;

            color:#fff;

            font-size:27px;

            margin-bottom:15px;

        }


        .login-right h2{

            color:#06295c;

            font-size:28px;

            line-height:1.3;

        }


        .login-subtitle{

            color:#687585;

            font-size:13px;

            margin-top:4px;

            margin-bottom:22px;

        }


        /* =================================================
           ROLE BUTTONS
        ================================================= */

        .role-buttons{

            display:grid;

            grid-template-columns:
                repeat(3,1fr);

            gap:7px;

            margin-bottom:22px;

        }


        .role-button{

            padding:10px 5px;

            border-radius:8px;

            border:1px solid #dce5ef;

            background:#fff;

            text-align:center;

            font-size:11px;

            font-weight:700;

            color:#687585;

            transition:.3s ease;

        }


        .role-button i{

            display:block;

            font-size:17px;

            margin-bottom:4px;

        }


        .role-button:hover{

            border-color:#16843d;

            color:#16843d;

            transform:translateY(-2px);

        }


        .role-button.active{

            background:#eef9f1;

            border-color:#16843d;

            color:#16843d;

        }


        /* =================================================
           ERROR
        ================================================= */

        .error-message{

            background:#fff0f0;

            border:1px solid #ffcaca;

            color:#c62828;

            padding:11px 13px;

            border-radius:8px;

            font-size:12px;

            margin-bottom:15px;

        }


        .success-message{

            background:#eef9f1;

            border:1px solid #bce5c8;

            color:#16843d;

            padding:11px 13px;

            border-radius:8px;

            font-size:12px;

            margin-bottom:15px;

        }


        /* =================================================
           FORM
        ================================================= */

        .form-group{

            margin-bottom:16px;

        }


        .form-group label{

            display:block;

            color:#273444;

            font-size:13px;

            font-weight:700;

            margin-bottom:6px;

        }


        .input-box{

            position:relative;

        }


        .input-box i{

            position:absolute;

            left:13px;

            top:50%;

            transform:translateY(-50%);

            color:#8a98a8;

            font-size:14px;

        }


        .input-box input{

            width:100%;

            height:48px;

            border:1px solid #dce5ef;

            border-radius:8px;

            outline:none;

            padding:0 14px 0 40px;

            font-size:13px;

            color:#273444;

            background:#fff;

            transition:.3s ease;

        }


        .input-box input:focus{

            border-color:#16843d;

            box-shadow:
                0 0 0 3px
                rgba(22,132,61,.08);

        }


        .password-toggle{

            position:absolute;

            right:12px;

            top:50%;

            transform:translateY(-50%);

            border:0;

            background:transparent;

            color:#687585;

            font-size:14px;

        }


        .login-options{

            display:flex;

            align-items:center;

            justify-content:space-between;

            gap:10px;

            margin:2px 0 18px;

        }


        .remember{

            display:flex;

            align-items:center;

            gap:6px;

            font-size:11px;

            color:#687585;

        }


        .remember input{

            accent-color:#16843d;

        }


        .forgot{

            color:#f36b12;

            font-size:11px;

            font-weight:700;

        }


        .forgot:hover{

            text-decoration:underline;

        }


        .login-button{

            width:100%;

            height:48px;

            border:0;

            border-radius:8px;

            background:
                linear-gradient(
                    135deg,
                    <?php echo $current['color']; ?>,
                    #0b3b7a
                );

            color:#fff;

            font-size:14px;

            font-weight:800;

            display:flex;

            align-items:center;

            justify-content:center;

            gap:8px;

            transition:.3s ease;

        }


        .login-button:hover{

            transform:translateY(-2px);

            box-shadow:
                0 8px 20px
                rgba(6,41,92,.20);

        }


        .register-text{

            text-align:center;

            margin-top:18px;

            color:#687585;

            font-size:11px;

        }


        .register-text a{

            color:#16843d;

            font-weight:800;

        }


        .admin-note{

            margin-top:18px;

            padding:10px;

            background:#fff5e9;

            border-radius:7px;

            color:#8a4b12;

            font-size:10px;

            line-height:1.6;

        }


        /* =================================================
           MOBILE
        ================================================= */

        @media(max-width:700px){

            body{

                padding:12px;

            }


            .login-wrapper{

                grid-template-columns:1fr;

                max-width:500px;

            }


            .login-left{

                padding:28px 20px;

            }


            .logo{

                width:85px;

                height:85px;

                margin-bottom:12px;

            }


            .login-left h1{

                font-size:22px;

            }


            .left-message{

                margin-top:15px;

                font-size:11px;

                line-height:1.6;

            }


            .service-icons{

                margin-top:15px;

            }


            .service-icons div{

                width:38px;

                height:38px;

                font-size:15px;

            }


            .login-right{

                padding:28px 20px;

            }


            .login-right h2{

                font-size:24px;

            }

        }


        @media(max-width:380px){

            .role-buttons{

                gap:4px;

            }


            .role-button{

                font-size:9px;

            }


            .role-button i{

                font-size:14px;

            }


            .login-right{

                padding:22px 15px;

            }

        }

    </style>

</head>


<body>


<div class="login-wrapper">


    <!-- =================================================
         LEFT SIDE
    ================================================= -->

    <div class="login-left">


        <img
            src="images/logo.png"
            alt="युवा सेवा संकल्प फाउंडेशन"
            class="logo">


        <h1>

            युवा सेवा
            <span>संकल्प</span>

            <strong>
                फाउंडेशन
            </strong>

        </h1>


        <p class="tagline">
            युवा शक्ति - राष्ट्र शक्ति
        </p>


        <p class="left-message">

            सेवा से बदलाव, संकल्प से विकास।
            शिक्षा, स्वास्थ्य, पर्यावरण, रक्तदान
            और समाज सेवा के लिए हमारे साथ जुड़ें।

        </p>


        <div class="service-icons">

            <div>
                <i class="fa-solid fa-book-open"></i>
            </div>

            <div>
                <i class="fa-solid fa-heart-pulse"></i>
            </div>

            <div>
                <i class="fa-solid fa-tree"></i>
            </div>

            <div>
                <i class="fa-solid fa-droplet"></i>
            </div>

        </div>

    </div>


    <!-- =================================================
         RIGHT SIDE
    ================================================= -->

    <div class="login-right">


        <a
            href="index.html"
            class="back-home">

            <i class="fa-solid fa-arrow-left"></i>

            वापस वेबसाइट पर जाएँ

        </a>


        <div class="login-icon">

            <i class="fa-solid <?php echo $current['icon']; ?>"></i>

        </div>


        <h2>

            <?php
            echo htmlspecialchars(
                $current['title']
            );
            ?>

        </h2>


        <p class="login-subtitle">

            <?php
            echo htmlspecialchars(
                $current['subtitle']
            );
            ?>

        </p>


        <!-- =================================================
             ROLE SELECT
        ================================================= -->

        <div class="role-buttons">


            <a
                href="login.php?role=member"
                class="role-button
                <?php echo $role === 'member' ? 'active' : ''; ?>">

                <i class="fa-solid fa-user"></i>

                सदस्य

            </a>


            <a
                href="login.php?role=volunteer"
                class="role-button
                <?php echo $role === 'volunteer' ? 'active' : ''; ?>">

                <i class="fa-solid fa-hands-helping"></i>

                Volunteer

            </a>


            <a
                href="login.php?role=admin"
                class="role-button
                <?php echo $role === 'admin' ? 'active' : ''; ?>">

                <i class="fa-solid fa-user-shield"></i>

                Admin

            </a>

        </div>


        <!-- =================================================
             ERROR
        ================================================= -->

        <?php if ($error !== ''): ?>

            <div class="error-message">

                <i class="fa-solid fa-circle-exclamation"></i>

                <?php
                echo htmlspecialchars($error);
                ?>

            </div>

        <?php endif; ?>


        <!-- =================================================
             SUCCESS
        ================================================= -->

        <?php if ($success !== ''): ?>

            <div class="success-message">

                <i class="fa-solid fa-circle-check"></i>

                <?php
                echo htmlspecialchars($success);
                ?>

            </div>

        <?php endif; ?>


        <!-- =================================================
             LOGIN FORM
        ================================================= -->

        <form
            action="login.php?role=<?php echo urlencode($role); ?>"
            method="POST">


            <input
                type="hidden"
                name="role"
                value="<?php echo htmlspecialchars($role); ?>">


            <!-- EMAIL -->

            <div class="form-group">

                <label for="email">
                    ईमेल पता
                </label>


                <div class="input-box">

                    <i class="fa-solid fa-envelope"></i>

                    <input
                        type="email"
                        id="email"
                        name="email"
                        value="<?php echo htmlspecialchars($email); ?>"
                        placeholder="अपना ईमेल दर्ज करें"
                        autocomplete="email"
                        required>

                </div>

            </div>


            <!-- PASSWORD -->

            <div class="form-group">

                <label for="password">
                    पासवर्ड
                </label>


                <div class="input-box">

                    <i class="fa-solid fa-lock"></i>

                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="अपना पासवर्ड दर्ज करें"
                        autocomplete="current-password"
                        required>


                    <button
                        type="button"
                        class="password-toggle"
                        id="passwordToggle"
                        aria-label="Password दिखाएँ">

                        <i class="fa-solid fa-eye"></i>

                    </button>

                </div>

            </div>


            <!-- OPTIONS -->

            <div class="login-options">


                <label class="remember">

                    <input
                        type="checkbox"
                        name="remember">

                    मुझे याद रखें

                </label>


                <a
                    href="forgot-password.php"
                    class="forgot">

                    पासवर्ड भूल गए?

                </a>

            </div>


            <!-- LOGIN BUTTON -->

            <button
                type="submit"
                class="login-button">

                <i class="fa-solid fa-right-to-bracket"></i>

                Login करें

            </button>


        </form>


        <!-- REGISTER -->

        <?php if ($role === 'member'): ?>

            <div class="register-text">

                नए सदस्य हैं?

                <a href="member.html">
                    सदस्य बनें
                </a>

            </div>

        <?php elseif ($role === 'volunteer'): ?>

            <div class="register-text">

                Volunteer बनना चाहते हैं?

                <a href="volunteer.html">
                    Volunteer बनें
                </a>

            </div>

        <?php endif; ?>


        <!-- ADMIN DEMO -->

        <?php if ($role === 'admin'): ?>

            <div class="admin-note">

                <i class="fa-solid fa-shield-halved"></i>

                Demo Admin Login:
                <strong>
                    admin@yuvasevasankalp.org
                </strong>

                <br>

                Demo Password:
                <strong>
                    admin123
                </strong>

                <br><br>

                <b>ध्यान दें:</b>
                वेबसाइट को live करने से पहले
                इस demo password को database
                आधारित secure login से बदलें।

            </div>

        <?php endif; ?>


    </div>

</div>


<script>

/* =========================================================
   PASSWORD SHOW / HIDE
========================================================= */

const passwordInput =
    document.getElementById("password");

const passwordToggle =
    document.getElementById("passwordToggle");


if (passwordToggle && passwordInput) {

    passwordToggle.addEventListener(
        "click",
        function () {

            const icon =
                passwordToggle.querySelector("i");


            if (passwordInput.type === "password") {

                passwordInput.type = "text";

                icon.classList.remove(
                    "fa-eye"
                );

                icon.classList.add(
                    "fa-eye-slash"
                );

            } else {

                passwordInput.type = "password";

                icon.classList.remove(
                    "fa-eye-slash"
                );

                icon.classList.add(
                    "fa-eye"
                );

            }

        }
    );

}

</script>


</body>

</html>
