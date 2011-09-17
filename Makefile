include $(GOROOT)/src/Make.inc

TARG=strugglin

GOFILES=\
  world.go \
  cell.go \
  player.go \
  server.go \
	
strugglin: strugglin.$(O)
	$(LD) -L _obj -o strugglin strugglin.$(O)

strugglin.$(O): main.go _obj/strugglin.a
	$(GC) -I_obj -o $@ main.go

$(GOBIN)/strugglin: strugglin
	cp strugglin $@

INSTALLFILES+=$(GOBIN)/strugglin
CLEANFILES+=$(GOBIN)/strugglin
CLEANFILES+=./strugglin

include $(GOROOT)/src/Make.pkg
