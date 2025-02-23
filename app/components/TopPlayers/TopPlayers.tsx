import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/app/context/LanguageContext';
import enTranslations from "../../locales/en/en.json";
import roTranslations from "../../locales/ro/ro.json";
import style from "./style.module.scss";


interface Player {
  id: number;
  username: string;
  country: string;
  points: number;
}


const TopPlayers = () => {
  const { language } = useLanguage();
  const translations = language === "ro" ? roTranslations.topPlayers : enTranslations.topPlayers;
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopPlayers = async () => {
      try {
        const userId = '1';

        const response = await fetch('/api/user/users', {
          headers: {
            'user-id': userId,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch top players');
        }

        const data = await response.json();
        console.log(data);
        setPlayers(data.topUsers);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTopPlayers();
  }, []);

  if (loading) return <p>{translations.loading}</p>;
  if (error) return <p>{translations.error}: {error}</p>;

  return (
    <div className={style.container}>
      <h2 className={style.title}>{translations.title}</h2>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
          <tr>
              <th className={style.subTitle}>{translations.position}</th>
              <th className={style.subTitle}>{translations.name}</th>
              <th className={style.subTitle}>{translations.country}</th>
              <th className={style.subTitle}>{translations.points}</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player: Player, index: number) => {
              let positionClass = '';
              if (index === 0) positionClass = style.firstPlace;
              if (index === 1) positionClass = style.secondPlace;
              if (index === 2) positionClass = style.thirdPlace;

              return (
                <tr key={player.id} className={positionClass}>
                  <td className={style.position}>{index + 1}</td>
                  <td className={style.username}>{player.username}</td>
                  <td className={style.country}>{player.country}</td>
                  <td className={style.points}>{player.points}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopPlayers;
