# Last Beat

**The Rhythm of Your Life, Quantified**

Unlock the power of your music habits with Last Beat. Gain insights into how music shapes your life and share your unique rhythm with the world. Dive deep into your audio history and let the data tell your story.

---

## Features

- 🎵 **Personalized Music Stats**: Visualize your top albums, artists, and tracks over time with beautiful, interactive charts.
- 📈 **Music Taste Evolution**: Explore your listening history and trends using data from [Last.fm](https://www.last.fm/api#getting-started). Spotify, Deezer, and Apple Music will be supported soon.
- 🖼️ **Topsters**: Create stunning posters of your top albums or artists to celebrate your music journey.
- 📝 **Lyrics Cards**: Turn your favorite song lyrics into customizable, shareable cards.
- **AOTY** : Showcase your most memorable albums per year. 
- **Covers download** : Download your favorite artists' covers.
- **Image generator** : Generate beautiful images for your music tierlists.

---

## Demo

Coming soon!

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/ley0x/last-beat.git
cd last-beat
```

### 2. Install dependencies

```bash
pnpm install # or yarn install or npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory :

```bash
cp .env.example .env
```

> Don't forget to replace the values with your own API keys and secrets.

- Get your [Last.fm API key](https://www.last.fm/api#getting-started)
- Get your [Spotify API credentials](https://developer.spotify.com/dashboard)
- Get your [Genius API credentials](https://genius.com/developers)

### 4. Run the development server

```bash
pnpm dev # or yarn dev or npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

---

## Docker

To run with Docker:

```bash
docker build -t last-beat .
docker run --env-file .env -p 3000:3000 last-beat
```

---

## Contributing

Contributions are welcome! Please open issues or pull requests for new features, bug fixes, or suggestions.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

---

## License

[MIT](LICENSE)

---

## Acknowledgements

- [Spotify Web API](https://developer.spotify.com/documentation/web-api/)
- [Last.fm API](https://www.last.fm/api)
- [Genius API](https://genius.com/developers)
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
