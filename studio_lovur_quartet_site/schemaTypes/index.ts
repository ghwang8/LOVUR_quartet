import {postType} from './postType'
import concertType from './concertType'
import { defineType, defineArrayMember } from 'sanity'
import featuredSong from './featuredSong'
import member from './member'
import concertPage from './concertPage'
import { pressKit, socialVideo, galleryImage } from './mediaPage';

export const schemaTypes = [postType, concertType, featuredSong, member, concertPage, pressKit, socialVideo, galleryImage]