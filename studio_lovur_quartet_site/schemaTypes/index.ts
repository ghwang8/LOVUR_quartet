import concertType from './concertType'
import { defineType, defineArrayMember } from 'sanity'
import featuredSong from './featuredSong'
import member from './member'
import concertPage from './concertPage'
import aboutPage from './aboutPage'
import { pressKit, socialVideo, galleryImage, gallery, } from './mediaPage';

export const schemaTypes = [ concertType, featuredSong, member, concertPage, pressKit, socialVideo, galleryImage, gallery, aboutPage ]