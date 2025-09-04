import Image from 'next/image';
import { Github, Mail, Globe, MapPin, Calendar } from 'lucide-react';

export default function ProfileHeader({ profile }) {
  if (!profile) return null;

  return (
    <div className="card mb-8 animate-fade-in">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <Image
          src={profile.avatar_url}
          alt={profile.name || profile.login}
          width={128}
          height={128}
          className="rounded-full border-4 border-github-blue"
        />
        
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {profile.name || profile.login}
          </h1>
          
          {profile.bio && (
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
              {profile.bio}
            </p>
          )}
          
          <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-600 dark:text-gray-400">
            {profile.location && (
              <div className="flex items-center gap-1">
                <MapPin size={16} />
                <span>{profile.location}</span>
              </div>
            )}
            
            {profile.blog && (
              <a
                href={profile.blog.startsWith('http') ? profile.blog : `https://${profile.blog}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-github-blue transition-colors"
              >
                <Globe size={16} />
                <span>Website</span>
              </a>
            )}
            
            <a
              href={profile.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-github-blue transition-colors"
            >
              <Github size={16} />
              <span>GitHub</span>
            </a>
            
            <div className="flex items-center gap-1">
              <Calendar size={16} />
              <span>Joined {new Date(profile.created_at).toLocaleDateString()}</span>
            </div>
          </div>
          
          <div className="flex justify-center md:justify-start gap-6 mt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {profile.followers}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Followers</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {profile.following}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Following</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {profile.public_repos}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Repositories</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}