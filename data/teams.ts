export interface TeamConfig {
    name: string;
    logo: string;
    tagline: string;
    gradient: string;
    glowColor: string;
}

export const teams: TeamConfig[] = [
    {
        name: 'Kölner Haie',
        logo: 'https://www.haie.de/wp-content/themes/haie/dist/img/del-teams/kec.svg?version=2023-09',
        tagline: 'Kölner Haie',
        gradient: 'linear-gradient(180deg, #1a1a3e 0%, #3d1e4f 15%, #e30613 35%, #ff6b7a 50%, #ffffff 55%, #ff6b7a 60%, #e30613 65%, #3d1e4f 85%, #1a1a3e 100%)',
        glowColor: 'rgba(227, 6, 19, 0.4)',
    },
    {
        name: 'Edmonton Oilers',
        logo: 'https://upload.wikimedia.org/wikipedia/en/4/4d/Logo_Edmonton_Oilers.svg',
        tagline: 'Edmonton Oilers',
        gradient: 'linear-gradient(180deg, #001f3f 0%, #003d7a 15%, #ff4c00 35%, #ff8c42 50%, #ffffff 55%, #ff8c42 60%, #ff4c00 65%, #003d7a 85%, #041E42 100%)',
        glowColor: 'rgba(255, 76, 0, 0.5)',
    },
];
