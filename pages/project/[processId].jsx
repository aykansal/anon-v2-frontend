'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { fetchMessagesAR, messageAR, runLua } from '@/lib/arkit';
import WalletConnect from '@/components/anon/WalletConnect';
import styles from './ProjectDetails.module.css';

const ProjectDetails = () => {
  const router = useRouter();
  const { processId } = router.query;

  const [projectData, setProjectData] = useState({
    name: 'AI Generated Marketplace',
    description: 'A decentralized marketplace built with Arweave',
    createdAt: new Date().toISOString(),
    processId: processId,
  });

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalTransactions: 0,
    totalStorage: 0,
    lastActivity: null,
  });

  useEffect(() => {
    if (processId) {
      fetchProjectData();
    }
  }, [processId]);

  const fetchProjectData = async () => {
    try {
      setLoading(true);
      const messages = await fetchMessagesAR({ process: processId });

      // Process messages to get project stats
      const processedTransactions = messages.map((msg) => ({
        id: msg.id,
        type: msg.tags?.find((t) => t.name === 'Action')?.value || 'Unknown',
        timestamp: new Date(msg.ingested_at).toLocaleString(),
        data: msg.data,
        owner: msg.owner,
      }));

      setTransactions(processedTransactions);

      // Calculate stats
      setStats({
        totalTransactions: processedTransactions.length,
        totalStorage: processedTransactions.reduce(
          (acc, tx) => acc + (tx.data?.size || 0),
          0
        ),
        lastActivity: processedTransactions[0]?.timestamp || null,
      });
    } catch (error) {
      console.error('Error fetching project data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <div className={styles.headerLeft}>
              <h1 className={styles.title}>{projectData.name}</h1>
              <p className={styles.description}>{projectData.description}</p>
            </div>
            <div className={styles.headerRight}>
              <WalletConnect
                onWalletConnected={(walletData) => {
                  console.log('Wallet connected:', walletData);
                }}
                buttonClassName={styles.walletButton}
              />
            </div>
          </div>
        </header>

        <main className={styles.main}>
          <div className={styles.contentWrapper}>
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <h3>Process ID</h3>
                <p className={styles.processId}>{processId}</p>
              </div>
              <div className={styles.statCard}>
                <h3>Total Transactions</h3>
                <p>{stats.totalTransactions}</p>
              </div>
              <div className={styles.statCard}>
                <h3>Storage Used</h3>
                <p>{(stats.totalStorage / 1024).toFixed(2)} KB</p>
              </div>
              <div className={styles.statCard}>
                <h3>Last Activity</h3>
                <p>{stats.lastActivity || 'No activity'}</p>
              </div>
            </div>

            <section className={styles.transactionsSection}>
              <div className={styles.sectionHeader}>
                <h2>Recent Transactions</h2>
                <Button
                  onClick={fetchProjectData}
                  disabled={loading}
                  className={styles.refreshButton}
                >
                  {loading ? 'Refreshing...' : 'Refresh'}
                </Button>
              </div>

              <div className={styles.transactionsList}>
                {transactions.length > 0 ? (
                  transactions.map((tx) => (
                    <div key={tx.id} className={styles.transactionCard}>
                      <div className={styles.transactionHeader}>
                        <span className={styles.transactionType}>
                          {tx.type}
                        </span>
                        <span className={styles.transactionTime}>
                          {tx.timestamp}
                        </span>
                      </div>
                      <p className={styles.transactionId}>ID: {tx.id}</p>
                      <p className={styles.transactionOwner}>
                        Owner: {tx.owner}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className={styles.noTransactions}>
                    <p>No transactions found for this process</p>
                  </div>
                )}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProjectDetails;
