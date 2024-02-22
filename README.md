<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a name="readme-top"></a>

<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

<!-- PROJECT LOGO -->
<br />
<div align="center">

<h1 align="center">DoMZX</h1>

  <p align="center">
    Home automation
    <br />
    <br />
    <a href="https://github.com/StanislasMzx/DoMZX">View Demo</a>
    ·
    <a href="https://github.com/StanislasMzx/DoMZX/issues">Report Bug</a>
    ·
    <a href="https://github.com/StanislasMzx/DoMZX/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#screenshots">Screenshots</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

DoMZX is a comprehensive home automation project that covers everything from development to deployment, offering complete control over your home's various systems. Using a Raspberry Pi as the central hub, DoMZX includes functionalities such as a pool timer, shutter controls, and door automation. The project is built using Flask for the backend and React for the frontend, providing a seamless user experience. With DoMZX, users can effortlessly manage and customize their home automation setup, bringing convenience and efficiency to everyday living.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- ![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
- ![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
- ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
- ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
- ![Raspberry Pi](https://img.shields.io/badge/-RaspberryPi-C51A4A?style=for-the-badge&logo=Raspberry-Pi)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Screenshots

![Home](/docs/home.png "Home")
![Timer](/docs/timer.png "Timer")
![Logs](/docs/logs.png "Logs")
![Settings](/docs/settings.png "Settings")

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

The project is designed with python3 and npm so make sure to have it installed

- python
  ```sh
  python3 --version
  ```
- node
  ```sh
  npm --version
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/StanislasMzx/DoMZX.git
   ```
2. Install requirements
   ```sh
   python3 -m pip install -r requirements.txt
   ```
3. Migrate de DB
   ```sh
   flask init-db
   ```
4. Setup frontend
   ```sh
   cd frontend
   npm i
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

### Backend

```sh
python3 app.py
```

### Frontend

```sh
cd frontend
npm run dev
```

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

- Yann DIONISIO <<yann.dionisio@telecomnancy.eu>>
- Adrien LAROUSSE <<adrien.larousse@telecomnancy.eu>>
- Mathis MANGOLD <<mathis.mangold@telecomnancy.eu>>
- Stanislas MEZUREUX <<stanislas.mezureux@telecomnancy.eu>>

Project Link: [https://github.com/StanislasMzx/DoMZX](https://github.com/StanislasMzx/DoMZX)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

- [QuickChart GraphViz API](https://quickchart.io/documentation/graphviz-api/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
