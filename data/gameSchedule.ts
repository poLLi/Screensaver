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
};

const gameScheduleData: Array<{ date: string; opponent: string; location: 'Home' | 'Away'; opponentCode: string }> = [
    { date: '2026-01-23T19:30:00', opponent: 'Schwenninger Wild Wings', location: 'Away', opponentCode: 'sww' },
    { date: '2026-01-25T16:30:00', opponent: 'Nürnberg Ice Tigers', location: 'Home', opponentCode: 'nit' },
    { date: '2026-01-27T19:30:00', opponent: 'Löwen Frankfurt', location: 'Home', opponentCode: 'fra' },
    { date: '2026-01-29T19:30:00', opponent: 'Adler Mannheim', location: 'Away', opponentCode: 'aem' },
    { date: '2026-01-31T19:30:00', opponent: 'EHC Red Bull München', location: 'Home', opponentCode: 'rbm' },
    { date: '2026-02-02T14:00:00', opponent: 'Eisbären Berlin', location: 'Away', opponentCode: 'ebb' },
    { date: '2026-02-04T19:30:00', opponent: 'Grizzlys Wolfsburg', location: 'Home', opponentCode: 'ggw' },
    { date: '2026-02-06T19:30:00', opponent: 'Fischtown Pinguins', location: 'Away', opponentCode: 'ftb' },
    { date: '2026-02-08T16:30:00', opponent: 'Straubing Tigers', location: 'Home', opponentCode: 'str' },
    { date: '2026-02-10T19:30:00', opponent: 'Düsseldorfer EG', location: 'Away', opponentCode: 'deg' },
    { date: '2026-02-12T19:30:00', opponent: 'Iserlohn Roosters', location: 'Home', opponentCode: 'ier' },
    { date: '2026-02-14T19:30:00', opponent: 'Augsburger Panther', location: 'Away', opponentCode: 'aep' },
    { date: '2026-02-16T14:00:00', opponent: 'ERC Ingolstadt', location: 'Home', opponentCode: 'erc' },
    { date: '2026-02-18T19:30:00', opponent: 'Schwenninger Wild Wings', location: 'Home', opponentCode: 'sww' },
    { date: '2026-02-20T19:30:00', opponent: 'Nürnberg Ice Tigers', location: 'Away', opponentCode: 'nit' },
    { date: '2026-02-22T16:30:00', opponent: 'Löwen Frankfurt', location: 'Away', opponentCode: 'fra' },
    { date: '2026-02-24T19:30:00', opponent: 'Adler Mannheim', location: 'Home', opponentCode: 'aem' },
    { date: '2026-02-26T19:30:00', opponent: 'EHC Red Bull München', location: 'Away', opponentCode: 'rbm' },
    { date: '2026-02-28T19:30:00', opponent: 'Eisbären Berlin', location: 'Home', opponentCode: 'ebb' },
    { date: '2026-03-02T14:00:00', opponent: 'Grizzlys Wolfsburg', location: 'Away', opponentCode: 'ggw' },
    { date: '2026-03-04T19:30:00', opponent: 'Fischtown Pinguins', location: 'Home', opponentCode: 'ftb' },
    { date: '2026-03-06T19:30:00', opponent: 'Straubing Tigers', location: 'Away', opponentCode: 'str' },
    { date: '2026-03-08T16:30:00', opponent: 'Düsseldorfer EG', location: 'Home', opponentCode: 'deg' },
    { date: '2026-03-10T19:30:00', opponent: 'Iserlohn Roosters', location: 'Away', opponentCode: 'ier' },
    { date: '2026-03-12T19:30:00', opponent: 'Augsburger Panther', location: 'Home', opponentCode: 'aep' },
    { date: '2026-03-14T19:30:00', opponent: 'ERC Ingolstadt', location: 'Away', opponentCode: 'erc' },
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
