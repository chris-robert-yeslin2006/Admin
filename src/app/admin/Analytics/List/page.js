'use client'

import {  useRouter, useSearchParams } from 'next/navigation'
import ProtectedRoute from '../../../../components/ProtectedRoute';
import { Pointer } from 'lucide-react';

export default function LanguageListPage() {
  const router = useRouter()
  
  // List of languages with their details
  const languages = [
    { 
      id: 'japanese', 
      name: 'Japanese', 
      nativeName: '日本語', 
      flag: '🇯🇵',
      speakers: '125 million'
    },
    { 
      id: 'mandarin', 
      name: 'Mandarin', 
      nativeName: '普通话', 
      flag: '🇨🇳',
      speakers: '1.1 billion'
    },
    { 
      id: 'spanish', 
      name: 'Spanish', 
      nativeName: 'Español', 
      flag: '🇪🇸',
      speakers: '460 million'
    },
    { 
      id: 'french', 
      name: 'French', 
      nativeName: 'Français', 
      flag: '🇫🇷',
      speakers: '275 million'
    },
    { 
      id: 'german',
      name: 'German',
      nativeName: 'Deutsch', 
      flag: '🇩🇪',
      speakers: '100 million'
    },
    { 
      id: 'english', 
      name: 'English', 
      nativeName: 'English', 
      flag: '🇬🇧',
      speakers: '1.4 billion'
    }
  ]
  const searchParams = useSearchParams();
  const orgId = searchParams.get('orgId');

  return (
    <ProtectedRoute>
    <div className="language-list-container">
      
      <div className="languages-grid">
        {languages.map((language) => (
          <div className="language-card" key={language.id}>
            <div className="language-flag">{language.flag}</div>
            <div className="language-info">
              <h2>{language.name}</h2>
              <p className="native-name">{language.nativeName}</p>
              <p className="speakers">{language.speakers} speakers</p>
            </div>
            <button 
              className="view-button"
              onClick={() =>
                router.push(
                  `List/LanguageDetails?orgId=${orgId}&language=${language.name}`
                )}
                style={{cursor:Pointer}}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
      
      <style jsx>{`
        .language-list-container {
          background-color : #f2f2f2;
          padding: 24px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
        
        .header {
          text-align: center;
          margin-bottom: 48px;
        }
        
        .header h1 {
          font-size: 32px;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 8px;
        }
        
        .header p {
          font-size: 18px;
          color: #6b7280;
        }
        
        .languages-grid {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 24px;
        }
        
        @media (min-width: 640px) {
          .languages-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (min-width: 1024px) {
          .languages-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        
        .language-card {
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          padding: 24px;
          display: flex;
          flex-direction: column;
          transition: transform 0.2s ease;
        }
        
        .language-card:hover {
          transform: translateY(-5px);
        }
        
        .language-flag {
          font-size: 48px;
          margin-bottom: 16px;
        }
        
        .language-info {
          flex-grow: 1;
        }
        
        .language-info h2 {
          font-size: 24px;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 8px;
        }
        
        .native-name {
          font-size: 18px;
          color: #4b5563;
          margin-bottom: 8px;
        }
        
        .speakers {
          font-size: 14px;
          color: #6b7280;
          margin-bottom: 16px;
        }
        
        .view-button {
          background-color: #3b82f6;
          color: white;
          border: none;
          border-radius: 6px;
          padding: 10px 16px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s ease;
          width: 100%;
        }
        
        .view-button:hover {
          background-color: #2563eb;
        }
      `}</style>
    </div>
    </ProtectedRoute>
  )
}