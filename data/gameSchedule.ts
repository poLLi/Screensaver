export interface Team {
    name: string;
    code: string;
    logo: string;
}

export interface Game {
    dateTime: string;
    homeTeam: Team;
    awayTeam: Team;
    location: string;
    date: string;
    time: string;
}

const haie: Team = {
    name: 'Kölner Haie',
    code: 'kec',
    logo: 'https://www.haie.de/img/logo/haie-logo.svg',
};

const teams: Record<string, Team> = {
    sww: { name: 'Schwenninger Wild Wings', code: 'sww', logo: 'https://www.haie.de/img/clubs/del/sww.svg' },
    nit: { name: 'Nürnberg Ice Tigers', code: 'nit', logo: 'https://www.haie.de/img/clubs/del/nit.svg' },
    fra: { name: 'Löwen Frankfurt', code: 'fra', logo: 'https://www.haie.de/img/clubs/del/fra.svg' },
    aem: { name: 'Adler Mannheim', code: 'aem', logo: 'https://www.haie.de/img/clubs/del/aem.svg' },
    rbm: { name: 'EHC Red Bull München', code: 'rbm', logo: 'https://www.haie.de/img/clubs/del/rbm.svg' },
    ebb: { name: 'Eisbären Berlin', code: 'ebb', logo: 'https://www.haie.de/img/clubs/del/ebb.svg' },
    ggw: { name: 'Grizzlys Wolfsburg', code: 'ggw', logo: 'https://www.haie.de/img/clubs/del/ggw.svg' },
    ftb: { name: 'Fischtown Pinguins', code: 'ftb', logo: 'https://www.haie.de/img/clubs/del/ftb.svg' },
    str: { name: 'Straubing Tigers', code: 'str', logo: 'https://www.haie.de/img/clubs/del/str.svg' },
    deg: { name: 'Düsseldorfer EG', code: 'deg', logo: 'https://www.haie.de/img/clubs/del/deg.svg' },
    ier: { name: 'Iserlohn Roosters', code: 'ier', logo: 'https://www.haie.de/img/clubs/del/ier.svg' },
    aep: { name: 'Augsburger Panther', code: 'aep', logo: 'https://www.haie.de/img/clubs/del/aep.svg' },
    erc: { name: 'ERC Ingolstadt', code: 'erc', logo: 'https://www.haie.de/img/clubs/del/erc.svg' },
    dre: { name: 'Dresdner Eislöwen', code: 'dre', logo: 'https://www.haie.de/img/clubs/del/dre.svg' },
};

const gameScheduleData: Array<{ date: string; opponent: string; location: 'Home' | 'Away'; opponentCode: string }> = [
    { date: '2026-02-25T19:30:00', opponent: 'Dresdner Eislöwen', location: 'Home', opponentCode: 'dre' },
    { date: '2026-02-27T19:30:00', opponent: 'ERC Ingolstadt', location: 'Home', opponentCode: 'erc' },
    { date: '2026-03-01T16:30:00', opponent: 'EHC Red Bull München', location: 'Away', opponentCode: 'rbm' },
    { date: '2026-03-04T19:30:00', opponent: 'Augsburger Panther', location: 'Home', opponentCode: 'aep' },
    { date: '2026-03-06T19:30:00', opponent: 'Adler Mannheim', location: 'Away', opponentCode: 'aem' },
    { date: '2026-03-08T14:00:00', opponent: 'Eisbären Berlin', location: 'Home', opponentCode: 'ebb' },
    { date: '2026-03-13T19:30:00', opponent: 'Grizzlys Wolfsburg', location: 'Away', opponentCode: 'ggw' },
    { date: '2026-03-15T14:00:00', opponent: 'Straubing Tigers', location: 'Away', opponentCode: 'str' },
];

export const games: Game[] = gameScheduleData.map((game) => {
    const dateTime = new Date(game.date);
    const opponent = teams[game.opponentCode];

    const isHome = game.location === 'Home';

    return {
        dateTime: game.date,
        homeTeam: isHome ? haie : opponent,
        awayTeam: isHome ? opponent : haie,
        location: game.location,
        date: dateTime.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
        }),
        time: dateTime.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        }),
    };
});
