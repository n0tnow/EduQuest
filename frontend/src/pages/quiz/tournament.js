import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import { useRouter } from 'next/router';
import { useWeb3 } from '../../contexts/Web3Context';

const Tournament = () => {
  const [tournaments, setTournaments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { account } = useWeb3();

  // Mock veri - gerçek veriler API'den gelecek
  const mockTournaments = [
    {
      id: 1,
      name: "Yazılım Bilgi Yarışması",
      startTime: "2024-01-05T15:00:00Z",
      teamSize: 3,
      prize: "1000 Puan + Özel NFT",
      registeredTeams: 8,
      maxTeams: 16,
      difficulty: "Orta",
      categories: ["JavaScript", "Python", "Web Development"]
    },
    {
      id: 2,
      name: "Matematik Turnuvası",
      startTime: "2024-01-06T18:00:00Z",
      teamSize: 2,
      prize: "800 Puan + Rare NFT",
      registeredTeams: 5,
      maxTeams: 8,
      difficulty: "Zor",
      categories: ["Cebir", "Geometri", "Analiz"]
    }
  ];

  useEffect(() => {
    setTournaments(mockTournaments);
    setIsLoading(false);
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('tr-TR', {
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleJoinTournament = async (tournamentId) => {
    if (!account) {
      alert('Lütfen önce cüzdanınızı bağlayın');
      return;
    }

    try {
      const response = await fetch('/api/tournament/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          tournamentId,
          walletAddress: account
        })
      });

      if (response.ok) {
        router.push(`/tournament/${tournamentId}/lobby`);
      } else {
        const data = await response.json();
        alert(data.message || 'Turnuvaya katılım başarısız');
      }
    } catch (error) {
      console.error('Tournament join error:', error);
      alert('Bir hata oluştu');
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-900 p-6 flex items-center justify-center">
          <div className="text-white">Yükleniyor...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-900 p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8">Takım Turnuvaları</h1>

          <div className="space-y-6">
            {tournaments.map((tournament) => (
              <div 
                key={tournament.id}
                className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold text-purple-400 mb-2">
                      {tournament.name}
                    </h2>
                    <p className="text-gray-400 mb-4">
                      Başlangıç: {formatDate(tournament.startTime)}
                    </p>
                    <div className="space-y-2 text-sm text-gray-400">
                      <p>Takım Büyüklüğü: {tournament.teamSize} kişi</p>
                      <p>Zorluk: {tournament.difficulty}</p>
                      <p>Kategoriler: {tournament.categories.join(', ')}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-purple-400 font-semibold mb-2">
                      Ödül: {tournament.prize}
                    </p>
                    <p className="text-gray-400 mb-4">
                      {tournament.registeredTeams}/{tournament.maxTeams} Takım
                    </p>
                    <button
                      onClick={() => handleJoinTournament(tournament.id)}
                      className="bg-purple-600 px-6 py-2 rounded-lg hover:bg-purple-700 transition"
                    >
                      Katıl
                    </button>
                  </div>
                </div>

                <div className="mt-4 bg-gray-900 rounded p-2">
                  <div className="bg-gray-800 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-purple-600 h-full rounded-full"
                      style={{
                        width: `${(tournament.registeredTeams / tournament.maxTeams) * 100}%`
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Tournament;