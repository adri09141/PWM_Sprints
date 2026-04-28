import { Injectable, inject } from '@angular/core';

import { Usuario } from '../../models/data.model';
import { FirestoreRepositoryService } from '../core/firestore/firestore-repository.service';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private readonly repository = inject(FirestoreRepositoryService);
  private readonly collectionPath = 'usuarios';

  getProfile(uid: string) {
    return this.repository.watchDocument<Usuario>(this.collectionPath, uid);
  }

  async getProfileOnce(uid: string): Promise<Usuario | null> {
    const profiles = await this.repository.getCollectionOnce<Usuario>(this.collectionPath);
    return profiles.find((profile) => profile.uid === uid) ?? null;
  }

  createProfile(uid: string, profile: Usuario): Promise<void> {
    return this.repository.set(this.collectionPath, uid, profile);
  }

  updateProfile(uid: string, profile: Partial<Usuario>): Promise<void> {
    return this.repository.update<Usuario>(this.collectionPath, uid, profile);
  }

  deleteProfile(uid: string): Promise<void> {
    return this.repository.delete(this.collectionPath, uid);
  }
}
