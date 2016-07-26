DROP TABLE IF EXISTS `same_guest`;
CREATE TABLE `same_guest` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` varchar(50) NOT NULL,
  `password` varchar(100) DEFAULT NULL,
  `lastestlog` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8
